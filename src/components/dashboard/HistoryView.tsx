import React from 'react';
import { Trash2, Search, ExternalLink } from 'lucide-react';

// Matching the data structure returned by the API
export interface HistoryItem {
    id: string;
    date: string;
    draft: {
        subreddit: string;
        title: string;
        body: string;
    };
    result: {
        isCompliant: boolean;
        score: number;
    };
}

interface HistoryViewProps {
    history: HistoryItem[];
    onLoadItem: (item: HistoryItem) => void;
    onClearHistory: () => void;
}

export default function HistoryView({ history, onLoadItem, onClearHistory }: HistoryViewProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-black">Analysis History</h2>
                    <p className="text-gray-500 text-sm">Your past post checks.</p>
                </div>
                {history.length > 0 && (
                    <button
                        onClick={onClearHistory}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 px-3 py-2 rounded-lg transition-colors"
                    >
                        <Trash2 size={16} /> Clear All
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="bg-white rounded-[24px] p-12 text-center border border-gray-100 shadow-soft">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-brand-black mb-2" id="empty-history-title">No history yet</h3>
                    <p className="text-gray-500">Start checking posts to build your history.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[24px] border border-gray-100 shadow-soft overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                    <th className="p-4 font-bold">Date</th>
                                    <th className="p-4 font-bold">Subreddit</th>
                                    <th className="p-4 font-bold">Title</th>
                                    <th className="p-4 font-bold">Score</th>
                                    <th className="p-4 font-bold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {history.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{item.date}</td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className="bg-brand-bg text-brand-black px-2 py-1 rounded text-xs font-bold border border-gray-200">
                                                r/{item.draft?.subreddit || 'subreddit'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-brand-black max-w-[200px] md:max-w-xs truncate" title={item.draft?.title}>
                                            {item.draft?.title || 'No Title'}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`${item.result?.isCompliant ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} px-2 py-1 rounded text-xs font-bold`}>
                                                {item.result?.score ?? 0}%
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <button
                                                onClick={() => onLoadItem(item)}
                                                className="text-brand-orange hover:text-orange-700 font-bold text-sm flex items-center gap-1"
                                                id={`open-report-${item.id}`}
                                            >
                                                Open <ExternalLink size={12} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
