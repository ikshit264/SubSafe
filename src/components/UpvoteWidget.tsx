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
                data-position="right" />
            <Script src="https://upvote.entrext.com/widget.js" strategy="afterInteractive" />
        </div>
    );
}
