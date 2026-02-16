'use client';

import React, { useState } from 'react';
import { NeoButton } from './ui/NeoButton';
import { APP_NAME, POPULAR_SUBREDDITS, FEATURES } from '@/constants';
import { CheckCircle, Zap, Shield, PenTool, ArrowRight, Star, X, AlertCircle, Check } from 'lucide-react';
import { analyzePost } from '@/services/geminiService';
import { AnalysisResult } from '@/types';

interface LandingPageProps {
    onNavigate: (view: any, id?: number) => void;
    isLoggedIn?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, isLoggedIn: isLoggedInProp }) => {
    // Live Demo State
    const [demoDraft, setDemoDraft] = useState({ subreddit: 'startups', title: 'Check out my new app!', body: 'I just built this new app and I want everyone to see it. Download it here: http://link.com' });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [demoResult, setDemoResult] = useState<AnalysisResult | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const isLoggedIn = isLoggedInProp || false;

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.products) setProducts(data.products);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const runDemo = async () => {
        setIsAnalyzing(true);
        // Simulate delay for effect
        await new Promise(r => setTimeout(r, 1500));
        try {
            const result = await analyzePost(demoDraft);
            setDemoResult(result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg relative font-sans selection:bg-brand-lime selection:text-black scroll-smooth overflow-x-hidden">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none h-[120vh]"></div>

            {/* Navbar */}
            <nav className="fixed w-full top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold text-lg transform -rotate-6 shadow-sm">
                            S
                        </div>
                        <span className="text-xl font-display font-bold text-brand-black">{APP_NAME}</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                        <a href="#demo" className="hover:text-black transition-colors">Live Demo</a>
                        <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
                        <button onClick={() => onNavigate('blog')} className="hover:text-black transition-colors">Blog</button>
                        <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
                    </div>

                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <NeoButton onClick={() => onNavigate('dashboard')} variant="primary" size="sm">Go to Dashboard</NeoButton>
                        ) : (
                            <>
                                <button onClick={() => onNavigate('login')} className="hidden md:block text-sm font-medium hover:text-brand-orange text-gray-400">Log in</button>
                                <NeoButton onClick={() => onNavigate('signup')} variant="primary" size="sm">Sign up</NeoButton>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Split Hero Section */}
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">

                    {/* Left Column: Copy */}
                    <div className="flex flex-col items-start text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
                            <span className="w-2 h-2 bg-brand-lime rounded-full animate-pulse"></span>
                            <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">Trusted by 10,000+ Founders</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] tracking-tight text-brand-black">
                            Post on Reddit <br />
                            <span className="text-brand-orange">without getting banned.</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                            SubSafe acts as your personal moderator. Analyze your posts against subreddit rules, hidden bans, and toxicity filters instantly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            {isLoggedIn ? (
                                <NeoButton onClick={() => onNavigate('dashboard')} variant="primary" size="lg">
                                    Open Dashboard <ArrowRight size={20} className="ml-2" />
                                </NeoButton>
                            ) : (
                                <NeoButton onClick={() => onNavigate('signup')} variant="primary" size="lg">
                                    Start Analyzing Free
                                </NeoButton>
                            )}
                            <button
                                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-white border border-gray-200 hover:border-black transition-all text-brand-black shadow-sm"
                            >
                                Try Live Demo
                                <span className="group-hover:translate-y-1 transition-transform">↓</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Visual Animation */}
                    <div className="relative h-[600px] hidden lg:block perspective-1000">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-lime/20 to-brand-orange/10 rounded-full blur-3xl -z-10"></div>

                        {/* Floating Card 1: Before */}
                        <div className="absolute top-0 left-0 w-[360px] bg-white rounded-2xl shadow-soft p-6 border border-red-100 transform -rotate-6 animate-float-delayed z-10">
                            <div className="absolute -top-3 -left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                Before Analysis
                            </div>
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">
                                    u/me
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">r/startups</div>
                                    <div className="text-sm font-bold text-brand-black">Check out my app!</div>
                                </div>
                                <div className="ml-auto px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase flex items-center gap-1">
                                    <X size={10} /> Removed
                                </div>
                            </div>
                            <div className="space-y-2 mb-3 opacity-50">
                                <div className="h-2 w-full bg-gray-200 rounded"></div>
                                <div className="h-2 w-full bg-gray-200 rounded"></div>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex gap-2 items-start">
                                <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                                <div>
                                    <div className="text-xs font-bold text-red-700">Mod Note</div>
                                    <p className="text-[10px] text-red-600 leading-tight">Post removed for excessive self-promotion.</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 2: After */}
                        <div className="absolute top-40 right-4 w-[380px] bg-white rounded-2xl shadow-soft-lg p-6 border-2 border-brand-black transform rotate-3 animate-float z-20">
                            <div className="absolute -top-3 -right-3 bg-brand-lime text-brand-black border-2 border-brand-black px-3 py-1 rounded-full text-xs font-bold shadow-soft flex items-center gap-1">
                                <Zap size={12} fill="currentColor" /> SubSafe Optimized
                            </div>
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                                <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs">u/me</div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">r/startups</div>
                                    <div className="text-sm font-bold text-brand-black">How I scaled to $10k MRR...</div>
                                </div>
                                <div className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase flex items-center gap-1">
                                    <Check size={10} /> Live
                                </div>
                            </div>
                            <div className="space-y-2 mb-4">
                                <div className="h-2 w-full bg-gray-100 rounded"></div>
                                <div className="h-2 w-11/12 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Demo Section */}
                <section id="demo" className="scroll-mt-24 mb-24">
                    {/* ... Demo UI ... */}
                    <div className="text-center mb-8">
                        <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">Interactive Demo</span>
                        <h2 className="text-3xl font-display font-bold text-brand-black">Try the Compliance Engine</h2>
                    </div>
                    <div className="bg-white rounded-[32px] shadow-soft-lg border border-gray-200 p-2 md:p-4 max-w-5xl mx-auto overflow-hidden">
                        <div className="bg-brand-bg rounded-[24px] border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
                            <div className="flex-1 p-8 flex flex-col gap-4">
                                <input
                                    value={demoDraft.subreddit}
                                    onChange={e => setDemoDraft({ ...demoDraft, subreddit: e.target.value })}
                                    className="bg-white border rounded-lg px-4 py-2 text-sm dark:text-black" placeholder="Subreddit"
                                />
                                <input
                                    value={demoDraft.title}
                                    onChange={e => setDemoDraft({ ...demoDraft, title: e.target.value })}
                                    className="bg-white border rounded-lg px-4 py-2 text-sm dark:text-black" placeholder="Title"
                                />
                                <textarea
                                    value={demoDraft.body}
                                    onChange={e => setDemoDraft({ ...demoDraft, body: e.target.value })}
                                    className="bg-white border rounded-lg px-4 py-2 text-sm flex-1 resize-none dark:text-black" placeholder="Post Body"
                                />
                                <NeoButton onClick={runDemo} disabled={isAnalyzing}>
                                    {isAnalyzing ? 'Analyzing...' : 'Run Demo Check'}
                                </NeoButton>
                            </div>
                            <div className="flex-1 bg-white p-8 border-l border-gray-100">
                                {demoResult ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-brand-black text-white rounded-xl">
                                            <div className="text-xs uppercase font-bold opacity-60">Compliance Score</div>
                                            <div className="text-3xl font-bold">{demoResult.score}%</div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase">Violations</h4>
                                            {demoResult.violations.map((v, i) => (
                                                <div key={i} className="text-sm text-red-500 flex gap-2"><span>•</span> {v}</div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-300 italic">Waiting for analysis...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-24 scroll-mt-24">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">How It Works</span>
                        <h2 className="text-4xl font-display font-bold text-brand-black mb-4">Your Safety Net in 4 Steps</h2>
                        <p className="text-gray-600 max-w-lg mx-auto">SubSafe uses AI to scan your post before you hit publish — so you never get caught by surprise.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {FEATURES.map((feature, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white rounded-[32px] p-8 border border-gray-100/60 shadow-soft transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                                style={{ animationDelay: `${idx * 150}ms` }}
                            >
                                {/* Hover Gradient Background */}
                                <div className="absolute inset-0 bg-linear-to-br from-brand-lime/10 via-transparent to-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />

                                {/* Giant Number Watermark */}
                                <div className="absolute -bottom-8 -right-8 text-[10rem] font-display font-bold text-gray-50 group-hover:text-brand-lime/10 transition-colors duration-700 pointer-events-none select-none leading-none">
                                    {idx + 1}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon Container */}
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm border border-gray-100 group-hover:border-brand-lime/20 group-hover:shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out">
                                        <span className="filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-500">{feature.icon}</span>
                                    </div>

                                    <h3 className="text-xl font-bold font-display text-brand-black mb-3 group-hover:text-brand-orange transition-colors duration-300">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8">
                                        {feature.description}
                                    </p>

                                    {/* Decorative line */}
                                    <div className="mt-auto h-1 w-12 bg-gray-100 rounded-full group-hover:w-full group-hover:bg-linear-to-r group-hover:from-brand-lime group-hover:to-brand-orange transition-all duration-700 ease-out origin-left" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 scroll-mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-brand-black mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-gray-600">Start for free, upgrade for power.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {products.map((tier, idx) => (
                            <div key={idx} className={`rounded-[32px] p-8 flex flex-col ${tier.name === 'Pro Creator' ? 'bg-brand-black text-white shadow-lg scale-105 z-10' : 'bg-white text-brand-black border border-gray-100'}`}>
                                <h3 className="text-lg font-bold mb-4">{tier.name}</h3>
                                <div className="mb-8 items-baseline flex">
                                    <span className="text-4xl font-display font-bold">{tier.price}</span>
                                    <span className="text-sm ml-2 opacity-60">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8 grow">
                                    {(tier.features || []).map((f: string, i: number) => (
                                        <li key={i} className="flex gap-3 items-center text-sm">
                                            <CheckCircle size={16} className={tier.name === 'Pro Creator' ? 'text-brand-lime' : 'text-green-500'} />
                                            <span className="opacity-80">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <NeoButton
                                    onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'signup')}
                                    variant={tier.name === 'Pro Creator' ? 'accent' : 'outline'}
                                    className="w-full"
                                >
                                    {isLoggedIn ? 'Upgrade Now' : tier.cta}
                                </NeoButton>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4 font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-orange rounded-md flex items-center justify-center text-white font-bold text-xs transform -rotate-6">S</div>
                        <span className="font-bold text-brand-black">{APP_NAME}</span>
                    </div>
                    <div className="flex gap-6">
                        <button onClick={() => onNavigate('blog')} className="hover:text-black transition-colors">Blog</button>
                        <a href="#" className="hover:text-black transition-colors">Privacy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms</a>
                    </div>
                    <p>© 2024 {APP_NAME} Inc.</p>
                </div>
            </footer>
        </div>
    );
};
