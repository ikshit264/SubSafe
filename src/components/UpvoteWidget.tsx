'use client';
import { useCallback, useEffect } from 'react';
import Script from 'next/script';

/**
 * Monkfeed feedback widget (feedback board, roadmap, what's new, support,
 * AI help). Loads the Monkfeed bootstrap script for the "Subsafe" project and
 * identifies the logged-in SubSafe user (Monkfeed('boot' | 'shutdown') with the
 * server-signed token from /api/monkfeed/token) so votes, comments and
 * "shipped" emails are tied to the real user.
 *
 * Configuration (environment):
 *   NEXT_PUBLIC_MONKFEED_URL        Base URL of the deployed Monkfeed app (defaults to https://monkfeed-p2.vercel.app)
 *   NEXT_PUBLIC_MONKFEED_TENANT_ID  Monkfeed project id (defaults to the Subsafe project)
 *   MONKFEED_SIGNING_SECRET         (server only) widget signing secret from Monkfeed Settings
 * Colours, logo, fonts, blog posts and quick links are managed in the Monkfeed
 * dashboard, not here.
 */
const MONKFEED_URL = (process.env.NEXT_PUBLIC_MONKFEED_URL || 'https://monkfeed-p2.vercel.app').replace(/\/+$/, '');
const TENANT_ID = process.env.NEXT_PUBLIC_MONKFEED_TENANT_ID || '6ee89eba-449a-4014-9a9e-16200d544b7c';

type MonkfeedSettings = {
    tenant_id?: string;
    user_id?: string;
    email?: string;
    name?: string;
    created_at?: string;
    user_jwt?: string;
};
type MonkfeedCall = { method: string; args: unknown[] };
type MonkfeedFn = ((command: string, ...args: unknown[]) => void) & { q?: MonkfeedCall[] };

/** The bootstrap drains calls queued before it loads, so boot/update/shutdown are safe to call at any time. */
function callMonkfeed(command: 'boot' | 'update' | 'shutdown', settings?: MonkfeedSettings) {
    const w = window as unknown as { Monkfeed?: MonkfeedFn };
    if (!w.Monkfeed) {
        const stub = ((c: string, ...a: unknown[]) => {
            (stub.q = stub.q || []).push({ method: c, args: a });
        }) as MonkfeedFn;
        w.Monkfeed = stub;
    }
    if (settings) w.Monkfeed(command, settings);
    else w.Monkfeed(command);
}

export default function UpvoteWidget() {
    const identify = useCallback(async () => {
        try {
            const res = await fetch(`/api/monkfeed/token?t=${Date.now()}`, { cache: 'no-store' });
            if (res.ok) {
                const data = (await res.json()) as {
                    token?: string;
                    user?: { id: string; email: string; name?: string; createdAt?: string };
                };
                if (data.token && data.user) {
                    // Signed token => the identity is verified; the other fields are Monkfeed's display/profile data.
                    callMonkfeed('boot', {
                        tenant_id: TENANT_ID,
                        user_id: data.user.id,
                        email: data.user.email,
                        ...(data.user.name ? { name: data.user.name } : {}),
                        ...(data.user.createdAt ? { created_at: data.user.createdAt } : {}),
                        user_jwt: data.token,
                    });
                    return;
                }
            }
            if (res.status === 401) callMonkfeed('shutdown');
            // 503 = signing secret not configured yet: the widget keeps working anonymously.
        } catch (error) {
            console.warn('[monkfeed] could not identify the current user', error);
        }
    }, []);

    useEffect(() => {
        if (!MONKFEED_URL) {
            console.warn('[monkfeed] NEXT_PUBLIC_MONKFEED_URL is not set; the feedback widget is disabled.');
            return;
        }
        void identify();
        const handleLogin = () => void identify();
        const handleLogout = () => callMonkfeed('shutdown');
        window.addEventListener('monkfeed:login', handleLogin);
        window.addEventListener('monkfeed:logout', handleLogout);
        return () => {
            window.removeEventListener('monkfeed:login', handleLogin);
            window.removeEventListener('monkfeed:logout', handleLogout);
        };
    }, [identify]);

    if (!MONKFEED_URL) return null;

    return (
        <>
            <link rel="stylesheet" href={`${MONKFEED_URL}/widget.css`} precedence="default" />
            <div id="feedback-widget-root" />
            <Script
                id="monkfeed-widget"
                src={`${MONKFEED_URL}/feedback-widget.js`}
                data-tenant-id={TENANT_ID}
                strategy="afterInteractive"
            />
        </>
    );
}
