'use client';
import { useEffect, useState, useCallback } from 'react';
import Script from 'next/script';

export default function UpvoteWidget() {
    const [userData, setUserData] = useState<any>(null);
    const [remountKey, setRemountKey] = useState(0);

    const fetchSession = useCallback(async () => {
        try {
            const res = await fetch(`/api/auth/me?t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                setUserData(data?.email ? data : null);
            } else {
                setUserData(null);
            }
        } catch (e) {
            console.error('Failed to fetch session for UpvoteWidget', e);
            setUserData(null);
        }
    }, []);

    useEffect(() => {
        fetchSession();
        const handleLogin = (e: any) => { setUserData(e.detail); setRemountKey(k => k + 1); };
        const handleLogout = () => {
            setUserData(null);
            setRemountKey(k => k + 1);
            if ((window as any).__upvote_cleanup) (window as any).__upvote_cleanup();
        };

        window.addEventListener('upvote:login', handleLogin);
        window.addEventListener('upvote:logout', handleLogout);
        window.addEventListener('focus', fetchSession);
        return () => {
            window.removeEventListener('upvote:login', handleLogin);
            window.removeEventListener('upvote:logout', handleLogout);
            window.removeEventListener('focus', fetchSession);
        };
    }, [fetchSession]);

    return (
        <div key={remountKey}>
            <div className="upvote-widget"
                data-application-id="69a41f4f3a9a405a41b02afe"
                data-user-id={userData?.id || ''}
                data-email={userData?.email || ''}
                data-logo-url="/favicon.png"
                data-product-overview="SubSafe is an AI-powered Reddit compliance tool that helps marketers, startup founders, and community managers validate and optimize their Reddit posts before publishing. It analyzes content against subreddit-specific rules, shadowban triggers, and automated moderation filters to maximize post success."
                data-about-text="SubSafe acts as a pre-flight check for Reddit posts, using Google Gemini AI to provide compliance scoring, violation flagging, and actionable rewrite suggestions. It helps users avoid account bans and post removals by coaching them on Reddit etiquette before they risk their account health."
                data-faqs='[
                    {"question":"What does SubSafe do?","answer":"SubSafe analyzes your Reddit posts before you publish them, checking against subreddit rules and automod filters to give you a compliance score and suggestions for improvement."},
                    {"question":"Who is SubSafe for?","answer":"SubSafe is designed for indie hackers, startup founders, digital marketers, and community managers who want to leverage Reddit for organic growth without risking bans or shadowbans."},
                    {"question":"How does the AI analysis work?","answer":"SubSafe uses Google Gemini AI to analyze your post title and body against known Reddit meta-rules and subreddit-specific guidelines, then returns a compliance score and actionable feedback."},
                    {"question":"Is there a free tier?","answer":"Yes! SubSafe offers a free tier with 3 analyses per day. Paid tiers like Creator Plus and Agency provide unlimited access and additional features."},
                    {"question":"Can SubSafe post directly to Reddit?","answer":"Currently, SubSafe provides analysis and recommendations. Direct posting via Reddit API integration is planned for future releases."}
                ]'
                data-position="right" />
            <Script src="http://upvote.entrext.com/widget.js" strategy="afterInteractive" />
        </div>
    );
}
