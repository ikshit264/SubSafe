import { Metadata } from 'next';
import { PseoLayout } from '@/components/pSEO/PseoLayout';
import Link from 'next/link';
import subsafeData from '@/seo-data/products/subsafe.json';

export const metadata: Metadata = {
    title: "SubSafe Features Deep Dive | SubSafe",
    description: "Explore the technical capabilities and features of the SubSafe Reddit Compliance Engine.",
    alternates: { canonical: "/features" },
};

export default function FeaturesIndex() {
    return (
        <PseoLayout>
            <div className="mb-12 text-center">
                <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">Directory</span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-6">SubSafe Features</h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">Deep dive into the tools built to keep your Reddit accounts safe.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {subsafeData.features.map((f: any) => (
                    <Link key={f.slug} href={`/features/${f.slug}`} className="group block h-full">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all h-full flex flex-col hover:-translate-y-1">
                            <h2 className="text-2xl font-bold font-display text-brand-black mb-3 group-hover:text-brand-orange transition-colors">{f.title}</h2>
                            <p className="text-gray-500 leading-relaxed mb-6 flex-grow">{f.solution_summary}</p>
                            <div className="text-brand-orange font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                Explore Feature <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </PseoLayout>
    );
}
