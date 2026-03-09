'use client';

import React, { useState, useEffect } from 'react';
import { NeoButton } from '../ui/NeoButton';
import { Check, Loader2 } from 'lucide-react';
import LoadingScreen from '../ui/LoadingScreen';

interface PricingProps {
    onClose?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onClose }) => {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.products) setProducts(data.products);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleUpgrade = async (plan: any) => {
        if (plan.price === 0) return;

        setLoadingTier(plan.name);
        try {
            const res = await fetch('/api/payments/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: plan.dodoProductId }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || 'Failed to initiate checkout');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoadingTier(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[400px] relative">
                <LoadingScreen
                    fullPage={false}
                    message="Updating Plans"
                    subMessage="Fetching latest pricing options..."
                />
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {products.map((tier) => (
                <div
                    key={tier.id}
                    className={`rounded-[32px] p-8 flex flex-col relative transition-all duration-300 hover:scale-[1.02] ${tier.name === "Creator Plus"
                        ? "bg-brand-black text-white shadow-soft-lg ring-4 ring-brand-lime/20 md:scale-110 z-10 py-12"
                        : "bg-white text-brand-black border border-gray-100 shadow-soft"
                        }`}
                >
                    {tier.name === "Creator Plus" && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-lime text-brand-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Most Popular
                        </div>
                    )}

                    <h3 className="text-xl font-bold font-display mb-2">{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className={`text-sm font-normal ${tier.name === "Creator Plus" ? "text-gray-400" : "text-gray-500"}`}>/{tier.interval || 'month'}</span>
                    </div>

                    <ul className="space-y-4 mb-8 grow">
                        {(tier.features || []).map((feat: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-medium">
                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.name === "Creator Plus" ? "bg-brand-lime text-black" : "bg-gray-100 text-brand-black"
                                    }`}>
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                <span className={tier.name === "Creator Plus" ? "text-gray-300" : "text-gray-600"}>{feat}</span>
                            </li>
                        ))}
                    </ul>

                    <NeoButton
                        variant={tier.name === "Creator Plus" ? "accent" : "primary"}
                        size="lg"
                        className="w-full"
                        disabled={tier.price === 0 || !!loadingTier}
                        onClick={() => handleUpgrade(tier)}
                    >
                        {loadingTier === tier.name ? <Loader2 className="animate-spin" size={18} /> : (tier.price === 0 ? "Current Plan" : tier.cta || "Upgrade Now")}
                    </NeoButton>
                </div>
            ))}
        </div>
    );
};
