'use client';

import React, { useEffect, useState } from 'react';
import { NeoButton } from '../ui/NeoButton';
import { User, Bell, CreditCard, Check } from 'lucide-react';
import { useCreditContext } from '@/lib/CreditContext';

export const SettingsView: React.FC = () => {
    const { credits, plan, isUnlimited, userName, email, refreshCredits } = useCreditContext();
    const [editName, setEditName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');

    useEffect(() => {
        refreshCredits();
    }, [refreshCredits]);

    useEffect(() => {
        if (userName) setEditName(userName);
    }, [userName]);

    const handleSaveName = async () => {
        if (!editName.trim() || editName.trim() === userName) return;
        setIsSaving(true);
        setSaveStatus('idle');
        try {
            const res = await fetch('/api/auth/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editName.trim() }),
            });
            if (res.ok) {
                setSaveStatus('saved');
                await refreshCredits();
                setTimeout(() => setSaveStatus('idle'), 2000);
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to save');
                setSaveStatus('error');
            }
        } catch {
            alert('An error occurred. Please try again.');
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    const planLabel = plan === 'agency' ? 'Agency' : plan === 'pro' ? 'Pro Creator' : 'Starter';
    const creditsUsed = isUnlimited ? 0 : (3 - credits);

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h2 className="text-2xl font-display font-bold text-brand-black">Settings</h2>
                <p className="text-gray-500 text-sm">Manage your account preferences.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-[24px] p-8 shadow-soft border border-gray-100">
                        <h3 className="text-lg font-bold text-brand-black mb-6 flex items-center gap-2">
                            <User size={20} className="text-gray-400" /> Profile Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => { setEditName(e.target.value); setSaveStatus('idle'); }}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                                <input type="email" defaultValue={email || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-400" readOnly />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-3">
                            {saveStatus === 'saved' && (
                                <span className="text-xs font-semibold text-green-600 flex items-center gap-1 animate-in fade-in duration-200">
                                    <Check size={14} /> Saved!
                                </span>
                            )}
                            <NeoButton
                                size="sm"
                                onClick={handleSaveName}
                                disabled={isSaving || !editName.trim() || editName.trim() === userName}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </NeoButton>
                        </div>
                    </div>

                    <div className="bg-white rounded-[24px] p-8 shadow-soft border border-gray-100">
                        <h3 className="text-lg font-bold text-brand-black mb-6 flex items-center gap-2">
                            <Bell size={20} className="text-gray-400" /> Notifications
                        </h3>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                                <span className="font-medium text-sm text-gray-700">Email me weekly summaries</span>
                                <input type="checkbox" defaultChecked className="w-5 h-5 accent-brand-orange" />
                            </label>
                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                                <span className="font-medium text-sm text-gray-700">Alert me on major rule changes</span>
                                <input type="checkbox" defaultChecked className="w-5 h-5 accent-brand-orange" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
