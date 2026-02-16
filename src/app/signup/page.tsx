'use client';

import React, { useEffect, useState } from 'react';
import { SignupPage } from '@/components/auth/SignupPage';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/ui/LoadingScreen';

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
        return <LoadingScreen message="Join SubSafe" subMessage="Setting up your account..." />;
    }


    return <SignupPage onLogin={handleLogin} onNavigate={handleNavigate} />;
}
