import { Metadata } from 'next';
import { PseoLayout } from '@/components/pSEO/PseoLayout';
import Link from 'next/link';
import subsafeData from '@/seo-data/products/subsafe.json';

export const metadata: Metadata = {
    title: "Reddit Marketing Use Cases | SubSafe",
    description: "Explore how different roles and companies use SubSafe for Reddit marketing, community management, and growth.",
    alternates: { canonical: "/use-cases" },
};

export default function UseCasesIndex() {
    return (
        <PseoLayout>
            <div className="mb-12 text-center">
                <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">Directory</span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-6">SubSafe Use Cases</h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">Discover how our Reddit Compliance Engine accelerates growth for different teams.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {subsafeData.use_cases.map((uc: any) => (
                    <Link key={uc.slug} href={`/use-cases/${uc.slug}`} className="group block h-full">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all h-full flex flex-col hover:-translate-y-1">
                            <h2 className="text-2xl font-bold font-display text-brand-black mb-3 group-hover:text-brand-orange transition-colors">{uc.title}</h2>
                            <p className="text-gray-500 leading-relaxed mb-6 flex-grow">{uc.solution_summary}</p>
                            <div className="text-brand-orange font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                Read Use Case <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </PseoLayout>
    );
}
