import { Metadata } from 'next';
import { PseoLayout } from '@/components/pSEO/PseoLayout';
import Link from 'next/link';
import industriesData from '@/seo-data/industries.json';

export const metadata: Metadata = {
    title: "Reddit Marketing by Industry | SubSafe",
    description: "Industry-specific guides and solutions for mastering Reddit marketing with SubSafe.",
    alternates: { canonical: "/industries" },
};

export default function IndustriesIndex() {
    return (
        <PseoLayout>
            <div className="mb-12 text-center">
                <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">Directory</span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-6">Industry Guides</h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">Tailored strategies for dominating your specific niche on Reddit safely.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {industriesData.map((ind: any) => (
                    <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group block h-full">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all h-full flex flex-col hover:-translate-y-1">
                            <h2 className="text-2xl font-bold font-display text-brand-black mb-3 group-hover:text-brand-orange transition-colors">{ind.title}</h2>
                            <p className="text-gray-500 leading-relaxed mb-6 flex-grow">{ind.description}</p>
                            <div className="text-brand-orange font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                Explore Industry <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </PseoLayout>
    );
}
