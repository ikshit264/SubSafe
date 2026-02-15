'use client';

import React from 'react';
import { NeoButton } from '@/components/ui/NeoButton';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
            <div className="bg-white rounded-[32px] p-12 shadow-soft border border-gray-100 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-brand-lime" size={40} />
                </div>
                <h1 className="text-3xl font-display font-bold text-brand-black mb-4">Payment Successful!</h1>
                <p className="text-gray-500 mb-8">Thank you for upgrading. Your account has been updated with new credits.</p>
                <NeoButton onClick={() => router.push('/dashboard')} className="w-full">
                    Go to Dashboard
                </NeoButton>
            </div>
        </div>
    );
}
