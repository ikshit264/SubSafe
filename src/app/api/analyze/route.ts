import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PostDraft } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { syncUserCredits, consumeCredit, isFreePlan } from "@/lib/credits";

const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        isCompliant: { type: Type.BOOLEAN },
        score: { type: Type.NUMBER },
        violations: { type: Type.ARRAY, items: { type: Type.STRING } },
        suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
        rewrittenContent: { type: Type.STRING },
        rulesChecked: { type: Type.ARRAY, items: { type: Type.STRING } },
        viralScore: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER },
                reasoning: { type: Type.STRING }
            },
            required: ["score", "reasoning"]
        },
        sentiment: {
            type: Type.OBJECT,
            properties: {
                promotional: { type: Type.NUMBER },
                helpful: { type: Type.NUMBER },
                controversial: { type: Type.NUMBER }
            },
            required: ["promotional", "helpful", "controversial"]
        },
        betterTitles: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["isCompliant", "score", "violations", "suggestions", "rewrittenContent", "rulesChecked", "viralScore", "sentiment", "betterTitles"],
};

export async function POST(req: NextRequest) {
    try {
        const draft: PostDraft = await req.json();
        const payload = await getUserFromToken() as any;
        const isLoggedIn = !!payload?.userId;

        let userPlan = 'free';
        let userCredits = 0;
        let isUnlimited = false;

        if (isLoggedIn) {
            // Sync credits (auto-refill at midnight for free users)
            const user = await syncUserCredits(payload.userId);
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            userPlan = user.plan || 'free';
            userCredits = user.credits;
            isUnlimited = !isFreePlan(userPlan);

            // Only enforce credit limits for FREE users
            if (!isUnlimited && userCredits <= 0) {
                return NextResponse.json({
                    error: "Out of credits",
                    message: "You have used your 3 daily credits. Credits refill every day at 12 AM UTC. Upgrade to Pro for unlimited analyses."
                }, { status: 403 });
            }
        }

        const apiKey = (process.env.GEMINI_API_KEY || process.env.API_KEY || "").trim();
        if (!apiKey) {
            return NextResponse.json({ error: "API_KEY is missing" }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
            You are an expert Reddit Content Strategist and Moderator.
            Target Subreddit: r/${draft.subreddit}
            Post Title: ${draft.title}
            Post Body: ${draft.body}
            Task: Analyze compliance, sentiment, and virality. Generate improvements.
            Return strictly JSON.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        let resultText = response.text || "";
        const firstBrace = resultText.indexOf('{');
        const lastBrace = resultText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            resultText = resultText.substring(firstBrace, lastBrace + 1);
        }

        const analysisResult = JSON.parse(resultText);

        // Store in DB and deduct credit if logged in
        let savedId = null;
        let updatedCredits = userCredits;

        if (isLoggedIn) {
            // Consume credit only for free users
            await consumeCredit(payload.userId);

            const saved = await prisma.analysisRequest.create({
                data: {
                    subreddit: draft.subreddit,
                    title: draft.title || "",
                    body: draft.body,
                    result: JSON.stringify(analysisResult),
                    userId: payload.userId,
                }
            });
            savedId = saved.id;

            // Get final credit count
            const finalUser = await prisma.user.findUnique({
                where: { id: payload.userId },
                select: { credits: true, plan: true }
            });
            updatedCredits = finalUser?.credits ?? 0;
        }

        return NextResponse.json({
            ...analysisResult,
            id: savedId,
            isGuest: !isLoggedIn,
            creditsRemaining: isUnlimited ? -1 : updatedCredits
        });

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
