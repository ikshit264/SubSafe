'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    History,
    Settings,
    LogOut,
} from 'lucide-react';
import { CreditProvider, useCreditContext } from '@/lib/CreditContext';

function DashboardInner({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { credits, plan, isUnlimited, userName, email, refreshCredits } = useCreditContext();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        refreshCredits();
    }, [refreshCredits]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const isActive = (path: string) => pathname === path;

    const NavItem = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
        <button
            onClick={() => router.push(href)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isActive(href) ? 'bg-brand-black text-white shadow-soft' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
        >
            <Icon size={18} />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-brand-bg font-sans flex text-brand-black">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-20">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold text-lg transform -rotate-6 shadow-sm">R</div>
                    <span className="font-display font-bold text-xl">SubSafe</span>
                </div>

                <div className="flex-1 p-4 space-y-2">
                    <NavItem href="/dashboard" icon={LayoutDashboard} label="Analysis" />
                    <NavItem href="/history" icon={History} label="History" />
                    <NavItem href="/settings" icon={Settings} label="Settings" />
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    {/* Credits card - only show for free users */}
                    {!isUnlimited ? (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase">Credits</span>
                                <span className="text-sm font-bold">{credits}/3</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                                <div className={`h-1.5 rounded-full transition-all duration-500 ${credits > 0 ? 'bg-brand-lime' : 'bg-red-400'}`} style={{ width: `${(credits / 3) * 100}%` }}></div>
                            </div>
                            <div className="text-[10px] text-gray-400 font-medium">Daily limit resets at midnight</div>
                        </div>
                    ) : (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase">Plan</span>
                                <span className="text-sm font-bold capitalize">{plan}</span>
                            </div>
                            <div className="text-[10px] text-brand-orange font-bold">Unlimited analyses ✨</div>
                        </div>
                    )}

                    <div className="px-4 mb-4">
                        <div className="text-xs font-bold text-gray-400 truncate">{userName}</div>
                        <div className="text-[10px] text-gray-500 truncate">{email}</div>
                    </div>

                    <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-500 font-medium text-sm transition-colors">
                        <LogOut size={16} /> Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 max-w-7xl mx-auto w-full">
                {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold">R</div>
                        <span className="font-bold text-lg">SubSafe</span>
                    </div>
                    <button onClick={() => setShowLogoutModal(true)}><LogOut size={20} className="text-gray-500" /></button>
                </div>

                {children}

                {/* Mobile Navigation Tab Bar */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around z-50">
                    <button onClick={() => router.push('/dashboard')} className={`p-2 rounded-lg ${isActive('/dashboard') ? 'text-brand-orange' : 'text-gray-400'}`}><LayoutDashboard /></button>
                    <button onClick={() => router.push('/history')} className={`p-2 rounded-lg ${isActive('/history') ? 'text-brand-orange' : 'text-gray-400'}`}><History /></button>
                    <button onClick={() => router.push('/settings')} className={`p-2 rounded-lg ${isActive('/settings') ? 'text-brand-orange' : 'text-gray-400'}`}><Settings /></button>
                </div>
            </main>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
                    <div className="relative bg-white rounded-2xl shadow-soft-lg p-8 w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                                <LogOut size={24} className="text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-black mb-2">Log out?</h3>
                            <p className="text-sm text-gray-500 mb-6">Are you sure you want to log out of your account?</p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                                >
                                    Ok, Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <CreditProvider>
            <DashboardInner>{children}</DashboardInner>
        </CreditProvider>
    );
}
