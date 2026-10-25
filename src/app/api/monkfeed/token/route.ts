import { NextResponse } from 'next/server';
import { createHmac } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * Signs a short-lived Monkfeed widget identity token for the logged-in
 * SubSafe user, so the Monkfeed widget can recognise them (and attribute
 * votes, comments and "shipped" emails) without a separate sign-up.
 *
 * The signing secret never reaches the browser: copy it from the Monkfeed
 * dashboard (Settings -> widget signing secret) into MONKFEED_SIGNING_SECRET.
 * Token format (matches Monkfeed's identity-token.ts):
 *   base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload, secretBytes))
 */
const TOKEN_TTL_SECONDS = 300;

function base64url(input: Buffer | string): string {
    return Buffer.from(input).toString('base64url');
}

export async function GET() {
    const secretHex = process.env.MONKFEED_SIGNING_SECRET;
    if (!secretHex || !/^[0-9a-fA-F]{32,}$/.test(secretHex)) {
        return NextResponse.json(
            { error: 'monkfeed_signing_secret_not_configured' },
            { status: 503, headers: { 'Cache-Control': 'no-store' } }
        );
    }

    const payload = (await getUserFromToken()) as { userId?: string } | null;
    if (!payload?.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, name: true, email: true, plan: true, createdAt: true },
    });
    if (!user?.email) {
        return NextResponse.json({ error: 'User not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }

    const now = Math.floor(Date.now() / 1000);
    const claims = {
        externalUserId: user.id,
        email: user.email,
        ...(user.name ? { name: user.name } : {}),
        // Optional sign-up date (Monkfeed shows it on the visitor profile).
        createdAt: user.createdAt.toISOString(),
        // Customer attributes (plan, ...): shown in the Monkfeed dashboard once
        // attribute support is deployed; ignored by older Monkfeed versions.
        attributes: { plan: user.plan || 'free' },
        iat: now,
        exp: now + TOKEN_TTL_SECONDS,
    };
    const encoded = base64url(JSON.stringify(claims));
    const signature = createHmac('sha256', Buffer.from(secretHex, 'hex')).update(encoded).digest('base64url');

    // `user` mirrors the signed claims so the page can call Monkfeed('boot', { user_id, email, name, created_at, user_jwt });
    // only the signed token makes the identity verified, the plain fields are for the widget's display.
    return NextResponse.json(
        {
            token: `${encoded}.${signature}`,
            user: { id: user.id, email: user.email, ...(user.name ? { name: user.name } : {}), createdAt: user.createdAt.toISOString() },
        },
        { headers: { 'Cache-Control': 'no-store' } }
    );
}
