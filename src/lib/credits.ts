import { prisma } from './prisma';

const FREE_DAILY_CREDITS = 3;

/**
 * Checks if a user is on a free plan (no active paid subscription).
 * Free users have plan === 'free' (or undefined/null for legacy users).
 */
export function isFreePlan(plan: string | null | undefined): boolean {
    return !plan || plan === 'free';
}

/**
 * Syncs user credits based on their plan:
 * - FREE users: Reset to 3 credits at 12 AM (midnight UTC) daily
 * - PRO/AGENCY users: No credit limit; credits field is irrelevant
 * 
 * Always returns the user with up-to-date credits.
 */
export async function syncUserCredits(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, credits: true, lastCreditReset: true, plan: true }
    });

    if (!user) return null;

    // Paid users don't need credit management
    if (!isFreePlan(user.plan)) {
        return user;
    }

    const now = new Date();
    const lastReset = new Date(user.lastCreditReset);

    // Check if current time has crossed midnight UTC since last reset
    // We compare calendar dates in UTC to determine if it's a new day
    const nowDateUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const lastResetDateUTC = new Date(Date.UTC(lastReset.getUTCFullYear(), lastReset.getUTCMonth(), lastReset.getUTCDate()));

    const isNewDay = nowDateUTC.getTime() > lastResetDateUTC.getTime();

    if (isNewDay) {
        // Reset credits to FREE_DAILY_CREDITS at midnight
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                credits: FREE_DAILY_CREDITS,
                lastCreditReset: now
            },
            select: { id: true, credits: true, lastCreditReset: true, plan: true }
        });
        return updatedUser;
    }

    return user;
}

/**
 * Consumes a credit for a free user.
 * Returns false if user has no credits remaining or is not found.
 * Paid users always return true (no credit deduction).
 */
export async function consumeCredit(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { credits: true, plan: true }
    });

    if (!user) return false;

    // Paid users don't consume credits
    if (!isFreePlan(user.plan)) {
        return true;
    }

    // Free user with no credits left
    if (user.credits <= 0) {
        return false;
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            credits: {
                decrement: 1
            }
        }
    });

    return true;
}

/**
 * Gets the current credit count for a user.
 * Returns null for paid users (unlimited), or the actual count for free users.
 */
export async function getUserCredits(userId: string): Promise<{ credits: number; plan: string; isUnlimited: boolean }> {
    const user = await syncUserCredits(userId);

    if (!user) {
        return { credits: 0, plan: 'free', isUnlimited: false };
    }

    const unlimited = !isFreePlan(user.plan);

    return {
        credits: unlimited ? FREE_DAILY_CREDITS : user.credits,
        plan: user.plan || 'free',
        isUnlimited: unlimited
    };
}
