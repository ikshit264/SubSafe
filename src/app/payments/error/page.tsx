'use client';

import React from 'react';
import { NeoButton } from '@/components/ui/NeoButton';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function PaymentErrorPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
            <div className="bg-white rounded-[32px] p-12 shadow-soft border border-gray-100 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="text-red-500" size={40} />
                </div>
                <h1 className="text-3xl font-display font-bold text-brand-black mb-4">Payment Failed</h1>
                <p className="text-gray-500 mb-8">Something went wrong with your transaction. Please try again or contact support.</p>
                <div className="space-y-4">
                    <NeoButton onClick={() => router.push('/payments')} className="w-full">
                        Try Again
                    </NeoButton>
                    <button onClick={() => router.push('/dashboard')} className="text-gray-500 text-sm font-bold hover:text-black">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
