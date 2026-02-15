'use client';

import { useState, useEffect } from 'react';
import { NeoButton } from '@/components/ui/NeoButton';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.products) {
                    setProducts(data.products.filter((p: any) => p.productId && p.productId !== 'free_tier'));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleUpgrade = async (productId: string) => {
        try {
            const res = await fetch('/api/payments/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || 'Failed to start checkout');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-black font-medium transition-colors mb-12"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-display font-bold text-brand-black mb-4">Choose Your Plan</h1>
                    <p className="text-gray-600">Upgrade to unlock more post checks and advanced features.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {isLoading ? (
                        <div className="col-span-full text-center py-12 text-gray-400 italic">Loading plans...</div>
                    ) : products.map((tier, idx) => (
                        <div key={idx} className={`rounded-[32px] p-8 flex flex-col ${tier.name === 'Pro Creator' ? 'bg-brand-black text-white shadow-soft-lg ring-4 ring-brand-lime/30' : 'bg-white text-brand-black border border-gray-200'}`}>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold">{tier.name}</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-display font-bold">{tier.price}</span>
                                    <span className={`text-sm ml-2 ${tier.name === 'Pro Creator' ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8 grow">
                                {(tier.features || []).map((f: string, i: number) => (
                                    <li key={i} className="flex gap-3 items-center text-sm">
                                        <CheckCircle size={16} className={tier.name === 'Pro Creator' ? 'text-brand-lime' : 'text-green-500'} />
                                        <span className={tier.name === 'Pro Creator' ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <NeoButton
                                onClick={() => handleUpgrade(tier.productId!)}
                                variant={tier.name === 'Pro Creator' ? 'accent' : 'outline'}
                                className="w-full"
                            >
                                {tier.cta}
                            </NeoButton>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
