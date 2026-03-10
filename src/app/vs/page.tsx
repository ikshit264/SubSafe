import { Metadata } from 'next';
import { PseoLayout } from '@/components/pSEO/PseoLayout';
import Link from 'next/link';
import subsafeData from '@/seo-data/products/subsafe.json';

export const metadata: Metadata = {
    title: "SubSafe Alternatives & Comparisons | SubSafe",
    description: "See how SubSafe compares against manual checking and other Reddit marketing tools.",
    alternates: { canonical: "/vs" },
};

export default function VsIndex() {
    return (
        <PseoLayout>
            <div className="mb-12 text-center">
                <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">Directory</span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-6">Comparisons & Alternatives</h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">Evaluate how SubSafe outperforms traditional Reddit marketing methods.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {subsafeData.competitors.map((c: any) => (
                    <Link key={c.slug} href={`/vs/${c.slug}`} className="group block h-full">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all h-full flex flex-col hover:-translate-y-1">
                            <h2 className="text-2xl font-bold font-display text-brand-black mb-3 group-hover:text-brand-orange transition-colors">{c.title}</h2>
                            <p className="text-gray-500 leading-relaxed mb-6 flex-grow">{c.solution_summary}</p>
                            <div className="text-brand-orange font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                View Comparison <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </PseoLayout>
    );
}
