'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import HistoryView, { HistoryItem } from '@/components/dashboard/HistoryView';

export default function HistoryPage() {
    const router = useRouter();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const res = await fetch('/api/history');
            if (res.ok) {
                const data = await res.json();
                setHistory(data.history);
            }
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const clearHistory = async () => {
        if (confirm('Are you sure you want to clear your history? This will delete all your reports permanently.')) {
            try {
                const res = await fetch('/api/history', { method: 'DELETE' });
                if (res.ok) {
                    setHistory([]);
                }
            } catch (err) {
                console.error('Failed to clear history:', err);
            }
        }
    };

    const handleLoadItem = (item: HistoryItem) => {
        router.push(`/history/${item.id}`);
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Loading history...</p>
            </div>
        );
    }

    return (
        <HistoryView
            history={history}
            onClearHistory={clearHistory}
            onLoadItem={handleLoadItem}
        />
    );
}
