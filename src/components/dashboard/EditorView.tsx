'use client';

import { useState } from 'react';
import { PostDraft, AnalysisResult } from '@/types';
import { ResultsDisplay } from './ResultsDisplay';
import { RedditPreview } from './RedditPreview';
import { NeoButton } from '../ui/NeoButton';
import { useCreditContext } from '@/lib/CreditContext';
import {
    Search,
    Edit3,
    Eye,
} from 'lucide-react';

const POPULAR_SUBREDDITS = ['startups', 'entrepreneur', 'saas', 'marketing', 'tech', 'business'];

export default function EditorView() {
    const { refreshCredits } = useCreditContext();
    const [draft, setDraft] = useState<PostDraft>({
        subreddit: '',
        title: '',
        body: ''
    });
    const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string>('');

    const LOADING_MESSAGES = ["", "Recalling rules...", "Analyzing sentiment...", "Calculating virality...", "Generating hooks..."];

    const handleSubredditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value.startsWith('r/')) value = value.slice(2);
        value = value.replace(/\s/g, '');
        setDraft({ ...draft, subreddit: value });
    };

    const handleAnalyze = async () => {
        if (!draft.subreddit || !draft.title || !draft.body) {
            setError('Please fill in all fields');
            return;
        }

        setIsAnalyzing(true);
        setError('');
        setResult(null);
        setLoadingStep(1);

        const stepInterval = setInterval(() => {
            setLoadingStep(prev => (prev < 4 ? prev + 1 : prev));
        }, 800);

        try {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(draft)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || data.message || 'Analysis failed');
                setIsAnalyzing(false);
                clearInterval(stepInterval);
                // Refresh credits even on error (e.g. out of credits)
                refreshCredits();
                return;
            }

            clearInterval(stepInterval);
            setLoadingStep(5);

            // Refresh credits in sidebar after analysis completes
            refreshCredits();

            setTimeout(() => {
                setResult(data);
                setIsAnalyzing(false);
                setLoadingStep(0);
            }, 600);

        } catch (err: any) {
            setError(err.message || 'Failed to analyze post');
            setIsAnalyzing(false);
            clearInterval(stepInterval);
        }
    };

    const applyRewrite = (newBody: string) => {
        setDraft(prev => ({ ...prev, body: newBody }));
        setEditorMode('edit');
    };

    const applyTitle = (newTitle: string) => {
        setDraft(prev => ({ ...prev, title: newTitle }));
    };

    return (
        <div className="animate-in fade-in duration-300">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-brand-black mb-1">New Post Analysis</h1>
                    <p className="text-gray-500 text-sm">Draft, check compliance, and optimize for virality.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setEditorMode('edit')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${editorMode === 'edit' ? 'bg-brand-black text-white shadow-soft' : 'bg-white text-gray-500 border border-gray-200'}`}
                    >
                        <Edit3 size={16} /> Editor
                    </button>
                    <button
                        onClick={() => setEditorMode('preview')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${editorMode === 'preview' ? 'bg-brand-orange text-white shadow-soft' : 'bg-white text-gray-500 border border-gray-200'}`}
                    >
                        <Eye size={16} /> Reddit Preview
                    </button>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left: Input Editor OR Reddit Preview */}
                <div className="lg:col-span-7 bg-white rounded-[24px] shadow-soft border border-gray-100 p-0 overflow-hidden relative min-h-[600px]">
                    {editorMode === 'edit' ? (
                        <div className="p-6 md:p-8 space-y-6">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">Target Subreddit</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-400 font-bold">r/</span>
                                    <input
                                        value={draft.subreddit}
                                        onChange={handleSubredditChange}
                                        placeholder="startups"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-4 py-3 font-semibold text-brand-black focus:bg-white focus:ring-2 focus:ring-brand-orange/10 outline-none transition-all"
                                    />
                                </div>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {POPULAR_SUBREDDITS.map(sub => (
                                        <button
                                            key={sub}
                                            onClick={() => setDraft(d => ({ ...d, subreddit: sub }))}
                                            className="text-[10px] bg-gray-50 hover:bg-gray-100 text-gray-500 px-2 py-1 rounded border border-gray-200 transition-colors font-bold uppercase tracking-tighter"
                                        >
                                            r/{sub}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">Post Title</label>
                                <input
                                    value={draft.title}
                                    onChange={(e) => setDraft(d => ({ ...d, title: e.target.value }))}
                                    placeholder="My SaaS Journey to $0..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-medium text-brand-black focus:bg-white focus:ring-2 focus:ring-brand-orange/10 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">Content Body</label>
                                <textarea
                                    value={draft.body}
                                    onChange={(e) => setDraft(d => ({ ...d, body: e.target.value }))}
                                    placeholder="Start typing your post..."
                                    className="w-full h-80 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-brand-black focus:bg-white focus:ring-2 focus:ring-brand-orange/10 outline-none transition-all resize-none leading-relaxed"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                                    {error}
                                </div>
                            )}

                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                <button onClick={() => setDraft({ subreddit: '', title: '', body: '' })} className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors">Clear Draft</button>
                                <NeoButton onClick={handleAnalyze} disabled={isAnalyzing || !draft.subreddit} className="min-w-32">
                                    {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                                </NeoButton>
                            </div>
                        </div>
                    ) : (
                        <RedditPreview draft={draft} />
                    )}
                </div>

                {/* Right: Results Panel */}
                <div className="lg:col-span-5">
                    {isAnalyzing ? (
                        <div className="bg-white rounded-[24px] shadow-soft border border-gray-100 p-8 h-full min-h-[500px] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 relative mb-6">
                                <div className="absolute inset-0 bg-brand-lime/30 rounded-full animate-ping"></div>
                                <div className="relative z-10 w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center">
                                    <Search className="text-brand-black" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Analyzing r/{draft.subreddit}</h3>
                            <p className="text-gray-400 text-sm mb-6 h-5">{LOADING_MESSAGES[loadingStep]}</p>
                            <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-orange transition-all duration-300" style={{ width: `${(loadingStep / 4) * 100}%` }}></div>
                            </div>
                        </div>
                    ) : result ? (
                        <ResultsDisplay
                            result={result}
                            onApplyRewrite={applyRewrite}
                            onApplyTitle={applyTitle}
                        />
                    ) : (
                        <div className="bg-gray-50/50 rounded-[24px] border-2 border-dashed border-gray-200 h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl shadow-soft flex items-center justify-center text-2xl mb-4 transform -rotate-3">✍️</div>
                            <h3 className="text-lg font-bold text-gray-400">Waiting for input</h3>
                            <p className="text-sm text-gray-400 max-w-[200px]">Fill out the draft on the left to start checking compliance.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
