import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';
import { syncUserCredits, isFreePlan } from '@/lib/credits';

export async function GET() {
    try {
        const payload = await getUserFromToken() as any;
        if (!payload || !payload.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Sync credits first (resets if past midnight for free users)
        await syncUserCredits(payload.userId);

        // Fetch the up-to-date user
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                name: true,
                email: true,
                plan: true,
                credits: true,
                lastCreditReset: true,
                createdAt: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            plan: user.plan || 'free',
            credits: isFreePlan(user.plan) ? user.credits : -1, // -1 signals unlimited to frontend
            isUnlimited: !isFreePlan(user.plan),
            lastCreditReset: user.lastCreditReset,
            createdAt: user.createdAt,
        });
    } catch (err) {
        console.error('Me API Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
