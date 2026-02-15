'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface CreditContextType {
    credits: number;
    plan: string;
    isUnlimited: boolean;
    userName: string;
    email: string;
    refreshCredits: () => Promise<void>;
}

const CreditContext = createContext<CreditContextType>({
    credits: 0,
    plan: 'free',
    isUnlimited: false,
    userName: '',
    email: '',
    refreshCredits: async () => { },
});

export function useCreditContext() {
    return useContext(CreditContext);
}

export function CreditProvider({ children }: { children: React.ReactNode }) {
    const [credits, setCredits] = useState<number>(0);
    const [plan, setPlan] = useState<string>('free');
    const [isUnlimited, setIsUnlimited] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const refreshCredits = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUserName(data.name || data.email?.split('@')[0] || 'User');
                setEmail(data.email || '');
                setCredits(data.credits ?? 0);
                setPlan(data.plan || 'free');
                setIsUnlimited(data.isUnlimited || false);
            }
        } catch (error) {
            console.error('Failed to refresh credits:', error);
        }
    }, []);

    return (
        <CreditContext.Provider value={{ credits, plan, isUnlimited, userName, email, refreshCredits }}>
            {children}
        </CreditContext.Provider>
    );
}
