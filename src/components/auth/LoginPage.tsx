'use client';

import React, { useState } from 'react';
import { NeoButton } from '../ui/NeoButton';
import { APP_NAME } from '@/constants';
import { ArrowLeft } from 'lucide-react';

interface LoginPageProps {
    onLogin: () => void;
    onNavigate: (view: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                onLogin();
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg relative flex flex-col items-center justify-center p-6">
            <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-50"></div>

            <button
                onClick={() => onNavigate('landing')}
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-black font-medium transition-colors z-20"
            >
                <ArrowLeft size={20} /> Back to Home
            </button>

            <div className="bg-white p-10 rounded-[32px] shadow-soft-lg w-full max-w-md relative z-10 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 transform -rotate-3">S</div>
                    <h2 className="text-3xl font-display font-bold text-brand-black mb-2">Welcome back</h2>
                    <p className="text-gray-500">Log in to your SubSafe account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all dark:text-black"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-gray-700">Password</label>
                            <a href="#" className="text-xs font-bold text-brand-orange hover:underline">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all dark:text-black"
                            required
                        />
                    </div>

                    <NeoButton type="submit" className="w-full" size="lg">Log In</NeoButton>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account? <button onClick={() => onNavigate('signup')} className="font-bold text-brand-black hover:underline">Sign up</button>
                </div>
            </div>
        </div>
    );
};
