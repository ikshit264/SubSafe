'use client';
import { useCallback, useEffect } from 'react';
import Script from 'next/script';

/**
 * Monkfeed feedback widget (feedback board, roadmap, what's new, support,
 * AI help). Loads the Monkfeed bootstrap script for the "Subsafe" project and
 * identifies the logged-in SubSafe user through a server-signed token
 * (/api/monkfeed/token) so votes, comments and "shipped" emails are tied to
 * the real user.
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

type WidgetCall = { method: string; args: unknown[] };
type WidgetFn = ((method: string, ...args: unknown[]) => void) & { q?: WidgetCall[] };

/** The bootstrap drains calls queued before it loads, so identify() is safe to call at any time. */
function callWidget(method: 'identify' | 'reset', ...args: unknown[]) {
    const w = window as unknown as { FeedbackWidget?: WidgetFn };
    if (!w.FeedbackWidget) {
        const stub = ((m: string, ...a: unknown[]) => {
            (stub.q = stub.q || []).push({ method: m, args: a });
        }) as WidgetFn;
        w.FeedbackWidget = stub;
    }
    w.FeedbackWidget(method, ...args);
}

export default function UpvoteWidget() {
    const identify = useCallback(async () => {
        try {
            const res = await fetch(`/api/monkfeed/token?t=${Date.now()}`, { cache: 'no-store' });
            if (res.ok) {
                const data = (await res.json()) as { token?: string };
                if (data.token) {
                    callWidget('identify', data.token);
                    return;
                }
            }
            if (res.status === 401) callWidget('reset');
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
        const handleLogout = () => callWidget('reset');
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
