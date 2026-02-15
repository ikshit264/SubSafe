'use client';

import React, { useState } from 'react';
import { AnalysisResult, PostDraft } from '@/types';
import {
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Flame,
    Zap,
    Copy,
    RotateCcw
} from 'lucide-react';
import { NeoButton } from '../ui/NeoButton';

interface ResultsDisplayProps {
    result: Partial<AnalysisResult>;
    onApplyRewrite?: (text: string) => void;
    onApplyTitle?: (title: string) => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
    result,
    onApplyRewrite,
    onApplyTitle
}) => {
    const [showCopyFeedback, setShowCopyFeedback] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
            {/* Compliance Card */}
            <div className={`rounded-[24px] p-6 text-white shadow-soft-lg relative overflow-hidden ${result.isCompliant ? 'bg-brand-black' : 'bg-brand-orange'}`}>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-xs opacity-70 uppercase font-bold">Safety Score</div>
                            <div className="text-5xl font-display font-bold">{result.score}%</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${result.isCompliant ? 'bg-brand-lime text-black' : 'bg-white text-orange-600'}`}>
                            {result.isCompliant ? 'PASS' : 'FAIL'}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                        {result.isCompliant ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                        {result.isCompliant ? 'Ready to post.' : 'Action required.'}
                    </div>
                </div>
            </div>

            {/* Viral Score Card */}
            <div className="bg-white rounded-[24px] shadow-soft border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-brand-black uppercase flex items-center gap-2">
                        <TrendingUp size={16} className="text-purple-600" /> Viral Potential
                    </h4>
                    <span className="text-xl font-bold text-purple-600">{result.viralScore?.score || 0}/100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                    <div className="h-2 rounded-full bg-linear-to-r from-purple-400 to-pink-500" style={{ width: `${result.viralScore?.score || 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{result.viralScore?.reasoning}</p>

                {/* Vibe Check */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Promotional</span>
                        <span className="font-bold">{result.sentiment?.promotional}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${(result.sentiment?.promotional ?? 0) > 70 ? 'bg-red-400' : 'bg-green-400'}`} style={{ width: `${result.sentiment?.promotional ?? 0}%` }}></div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Helpful</span>
                        <span className="font-bold">{result.sentiment?.helpful}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-blue-400" style={{ width: `${result.sentiment?.helpful}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Alternative Hooks */}
            {result.betterTitles && result.betterTitles.length > 0 && (
                <div className="bg-linear-to-br from-brand-lime/20 to-brand-bg rounded-[24px] p-6 border border-brand-lime/30">
                    <h4 className="text-xs font-bold text-brand-black uppercase flex items-center gap-2 mb-3">
                        <Flame size={16} className="text-orange-500" /> Viral Hook Alternatives
                    </h4>
                    <div className="space-y-2">
                        {result.betterTitles.map((title, i) => (
                            <button
                                key={i}
                                onClick={() => onApplyTitle?.(title)}
                                className={`w-full text-left p-3 bg-white/60 hover:bg-white border border-transparent hover:border-brand-lime rounded-xl text-sm font-medium transition-all group ${!onApplyTitle ? 'cursor-default' : ''}`}
                            >
                                {title}
                                {onApplyTitle && <span className="hidden group-hover:inline float-right text-xs text-brand-orange font-bold">Apply</span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Violations & Rewrite */}
            <div className="bg-white rounded-[24px] shadow-soft border border-gray-100 p-6">
                {(result.violations?.length ?? 0) > 0 ? (
                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-red-500 uppercase mb-3">Violations</h4>
                        <ul className="space-y-2">
                            {result.violations?.map((v, i) => (
                                <li key={i} className="flex gap-2 text-sm text-gray-700 bg-red-50 p-2 rounded-lg">
                                    <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" /> {v}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="mb-6 text-center text-gray-400 text-sm italic">No violations found!</div>
                )}

                {result.rewrittenContent && (
                    <div className="pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-xs font-bold text-brand-black uppercase flex items-center gap-1">
                                <Zap size={12} className="text-brand-lime fill-brand-lime" /> AI Fix
                            </h4>
                            <button onClick={() => handleCopy(result.rewrittenContent || '')} className="text-xs font-bold text-brand-orange flex items-center gap-1">
                                <Copy size={12} /> {showCopyFeedback ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 max-h-40 overflow-y-auto mb-3">
                            {result.rewrittenContent}
                        </div>
                        {onApplyRewrite && (
                            <NeoButton onClick={() => onApplyRewrite(result.rewrittenContent || '')} size="sm" variant="accent" className="w-full">
                                <RotateCcw size={14} /> Apply Rewrite
                            </NeoButton>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
