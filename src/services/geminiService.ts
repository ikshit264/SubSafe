import { AnalysisResult, PostDraft } from "../types";

export const analyzePost = async (draft: PostDraft): Promise<AnalysisResult> => {
    try {
        const res = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(draft),
        });

        if (!res.ok) {
            throw new Error('Analysis request failed');
        }

        return await res.json();
    } catch (error) {
        console.error("Analysis Error:", error);
        return {
            isCompliant: false,
            score: 0,
            violations: ["System Error: Unable to connect to analysis service."],
            suggestions: ["Please check your internet connection or try again later."],
            rewrittenContent: draft.body,
            rulesChecked: ["Connection Check"],
            viralScore: { score: 0, reasoning: "N/A" },
            sentiment: { promotional: 0, helpful: 0, controversial: 0 },
            betterTitles: []
        };
    }
};
