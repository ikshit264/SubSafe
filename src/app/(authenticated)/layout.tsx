'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthed, setIsAuthed] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.id) {
                        setIsAuthed(true);
                    } else {
                        router.replace('/login');
                    }
                } else {
                    router.replace('/login');
                }
            } catch {
                router.replace('/login');
            } finally {
                setIsChecking(false);
            }
        };
        checkAuth();
    }, [router]);

    if (isChecking) {
        return (
            <div className="min-h-screen bg-brand-bg flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthed) {
        return null; // Will redirect, render nothing during redirect
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
