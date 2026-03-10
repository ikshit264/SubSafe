import { Metadata } from 'next';
import { PseoLayout } from '@/components/pSEO/PseoLayout';
import Link from 'next/link';
import problemsData from '@/seo-data/problems.json';

export const metadata: Metadata = {
    title: "Reddit Marketing Solutions | SubSafe",
    description: "Solutions for common Reddit marketing problems like shadowbans and instant post removals.",
    alternates: { canonical: "/solutions" },
};

export default function SolutionsIndex() {
    return (
        <PseoLayout>
            <div className="mb-12 text-center">
                <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">Directory</span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-6">Problems We Solve</h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">Stop guessing why your posts fail. Here is how SubSafe fixes common Reddit issues.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {problemsData.map((p: any) => (
                    <Link key={p.slug} href={`/solutions/${p.slug}`} className="group block h-full">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all h-full flex flex-col hover:-translate-y-1">
                            <h2 className="text-2xl font-bold font-display text-brand-black mb-3 group-hover:text-brand-orange transition-colors">{p.title}</h2>
                            <p className="text-gray-500 leading-relaxed mb-6 flex-grow">{p.description}</p>
                            <div className="text-brand-orange font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                View Solution <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </PseoLayout>
    );
}
