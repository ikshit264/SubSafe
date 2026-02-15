'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResultsDisplay } from '@/components/dashboard/ResultsDisplay';
import { ArrowLeft, Loader2, Calendar, MessageSquare } from 'lucide-react';
import { NeoButton } from '@/components/ui/NeoButton';
import { HistoryItem } from '@/components/dashboard/HistoryView';

export default function HistoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [item, setItem] = useState<HistoryItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`/api/history/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setItem(data.item);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        if (params.id) fetchItem();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Loading report...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl mb-4">🔍</div>
                <h2 className="text-xl font-bold text-brand-black mb-2">Report Not Found</h2>
                <p className="mb-6 max-w-xs text-sm">We couldn't find the analysis report you're looking for.</p>
                <NeoButton onClick={() => router.push('/history')}>Back to History</NeoButton>
            </div>
        );
    }

    // item.result is already parsed in the API route
    const resultData = item.result;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <button
                onClick={() => router.push('/history')}
                className="flex items-center gap-2 text-gray-400 hover:text-brand-black font-semibold text-sm transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to History
            </button>

            <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-soft">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                r/{item.draft?.subreddit || 'subreddit'}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                <Calendar size={14} />
                                {item.date || 'Unknown Date'}
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-black">
                            {item.draft?.title || 'No Title'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Post Type</div>
                            <div className="text-sm font-bold text-brand-black flex items-center gap-1.5 justify-end">
                                <MessageSquare size={14} className="text-brand-orange" /> Reddit Text Post
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-6 space-y-6">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase mb-3 block tracking-wider">Post Content</label>
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 md:p-6 text-brand-black leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto font-medium text-sm md:text-base">
                                {item.draft?.body || 'No content.'}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <label className="text-xs font-bold text-gray-400 uppercase mb-3 block tracking-wider">AI Analysis Result</label>
                        <ResultsDisplay result={resultData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
