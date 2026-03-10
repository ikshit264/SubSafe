'use client';
import React from 'react';
import { APP_NAME } from '@/constants';
import { NeoButton } from '@/components/ui/NeoButton';
import Link from 'next/link';

export function PseoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-lime selection:text-black dark:text-gray-800 flex flex-col">
            <nav className="fixed w-full top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold text-lg transform -rotate-6 shadow-sm">
                            S
                        </div>
                        <span className="text-xl font-display font-bold text-brand-black">{APP_NAME}</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-sm font-medium hover:text-brand-orange hidden md:block text-gray-500">Home</Link>
                        <Link href="/signup">
                            <NeoButton variant="primary" size="sm">Get Started</NeoButton>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto flex-1 w-full">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": process.env.NEXT_PUBLIC_SITE_URL || "https://subsafe.app"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Resources"
                                }
                            ]
                        })
                    }}
                />
                {children}

                {/* Universal CTA Block */}
                <div className="mt-16 bg-brand-black text-white rounded-[32px] p-10 text-center relative overflow-hidden shadow-soft-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    <div className="relative z-10 max-w-lg mx-auto">
                        <h2 className="text-3xl font-display font-bold mb-4">Ready to post safely?</h2>
                        <p className="text-gray-400 mb-8 font-medium">Stop gambling with your Reddit accounts. Analyze your posts before they go live and bypass the automod.</p>
                        <Link href="/signup">
                            <NeoButton variant="accent" size="lg">Start Analyzing for Free</NeoButton>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white py-12 border-t border-gray-100 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-6 h-6 bg-brand-orange rounded-md flex items-center justify-center text-white font-bold text-xs transform -rotate-6">S</div>
                        <span className="font-bold text-brand-black">{APP_NAME}</span>
                    </Link>
                    <div className="flex gap-6 flex-wrap justify-center">
                        {/* Standard Links */}
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
                        <Link href="/payments" className="hover:text-black transition-colors">Pricing</Link>
                        <Link href="/login" className="hover:text-black transition-colors">Login</Link>
                        {/* Programmatic SEO Links */}
                        <Link href="/use-cases" className="hover:text-black transition-colors">Use Cases</Link>
                        <Link href="/vs" className="hover:text-black transition-colors">Comparisons</Link>
                        <Link href="/features" className="hover:text-black transition-colors">Features</Link>
                        <Link href="/industries" className="hover:text-black transition-colors">Industries</Link>
                        <Link href="/solutions" className="hover:text-black transition-colors">Solutions</Link>
                        {/* Legal */}
                        <span className="text-gray-300 mx-2">|</span>
                        <a href="#" className="hover:text-black transition-colors">Privacy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms</a>
                    </div>
                    <p>© 2024 {APP_NAME} Inc.</p>
                </div>
            </footer>
        </div>
    );
}
