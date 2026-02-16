'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HistoryView, { HistoryItem } from '@/components/dashboard/HistoryView';
import LoadingScreen from '@/components/ui/LoadingScreen';

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
        return <LoadingScreen message="Fetching History" subMessage="Loading your previous analysis reports" />;
    }


    return (
        <HistoryView
            history={history}
            onClearHistory={clearHistory}
            onLoadItem={handleLoadItem}
        />
    );
}
