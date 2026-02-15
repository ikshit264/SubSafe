'use client';

import React, { useState } from 'react';
import { NeoButton } from '../ui/NeoButton';
import { ArrowLeft } from 'lucide-react';

interface SignupPageProps {
    onLogin: () => void;
    onNavigate: (view: any, id?: number) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onLogin, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (data.success) {
                onLogin();
            } else {
                alert(data.error || 'Signup failed');
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
                    <h2 className="text-3xl font-display font-bold text-brand-black mb-2">Create Account</h2>
                    <p className="text-gray-500">Start checking your Reddit posts for free.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime/20 focus:border-brand-lime transition-all dark:text-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime/20 focus:border-brand-lime transition-all dark:text-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime/20 focus:border-brand-lime transition-all dark:text-black"
                            required
                        />
                    </div>

                    <NeoButton type="submit" className="w-full" size="lg" variant="accent">Create Account</NeoButton>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <button onClick={() => onNavigate('login')} className="font-bold text-brand-black hover:underline">Log in</button>
                </div>
            </div>
        </div>
    );
};
