import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { syncUserCredits, isFreePlan } from '@/lib/credits';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Sync credits on login (refill if past midnight for free users)
        const syncedUser = await syncUserCredits(user.id);

        const token = await createToken({ userId: user.id });
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        const plan = syncedUser?.plan || 'free';

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                plan: plan,
                credits: isFreePlan(plan) ? (syncedUser?.credits ?? 3) : -1,
                isUnlimited: !isFreePlan(plan),
            }
        });
    } catch (err: any) {
        console.error('Login Error:', err);
        return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
    }
}
