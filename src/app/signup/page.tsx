'use client';

import React, { useEffect, useState } from 'react';
import { SignupPage } from '@/components/auth/SignupPage';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.id) {
                        router.replace('/dashboard');
                        return;
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    const handleLogin = () => {
        router.push('/dashboard');
    };

    const handleNavigate = (view: string, id?: number) => {
        if (view === 'login') router.push('/login');
        else if (view === 'landing') router.push('/');
        else if (view === 'blog') router.push('/blog');
        else router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-bg flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return <SignupPage onLogin={handleLogin} onNavigate={handleNavigate} />;
}
