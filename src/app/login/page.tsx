'use client';

import React from 'react';
import { LoginPage } from '@/components/auth/LoginPage';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
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
        if (view === 'signup') router.push('/signup');
        else if (view === 'landing') router.push('/');
        else if (view === 'blog') router.push('/blog');
        else router.push('/');
    };

    if (isLoading) {
        return <LoadingScreen message="Welcome Back" subMessage="Preparing login..." />;
    }


    return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
}
