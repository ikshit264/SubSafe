import React from 'react';
import Link from 'next/link';

interface SubSafeData {
    product_name: string;
    use_cases: any[];
    competitors: any[];
    features: any[];
}

export function InternalLinkingBlock({ productData }: { productData: SubSafeData }) {
    // Take first 2 use cases, 1 competitor, 1 industry
    const useCases = productData.use_cases.slice(0, 2);
    const competitors = productData.competitors.slice(0, 1);
    const industry = { slug: 'saas', name: 'SaaS' }; // Using the first industry from our list

    return (
        <div className="mt-12 p-8 bg-gray-50 rounded-[32px] border border-gray-100">
            <h3 className="text-xl font-bold font-display text-brand-black mb-6">Explore More from SubSafe</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-3">Product</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="text-brand-orange hover:text-brand-lime font-medium transition-colors">
                                {productData.product_name} Homepage
                            </Link>
                        </li>
                        {useCases.map((uc) => (
                            <li key={uc.slug}>
                                <Link href={`/use-cases/${uc.slug}`} className="text-gray-600 hover:text-brand-orange transition-colors">
                                    {uc.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-3">Comparisons &amp; Industries</h4>
                    <ul className="space-y-2">
                        {competitors.map((c) => (
                            <li key={c.slug}>
                                <Link href={`/vs/${c.slug}`} className="text-gray-600 hover:text-brand-orange transition-colors">
                                    {c.title}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href={`/industries/${industry.slug}`} className="text-gray-600 hover:text-brand-orange transition-colors">
                                Reddit Marketing for {industry.name}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
