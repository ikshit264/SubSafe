import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { PseoLayout } from '@/components/pSEO/PseoLayout';
import { InternalLinkingBlock } from '@/components/pSEO/InternalLinkingBlock';
import subsafeData from '@/seo-data/products/subsafe.json';
import blogsData from '@/seo-data/blogs.json';

type Props = {
    params: Promise<{ competitor: string }>;
};

export async function generateStaticParams() {
    return subsafeData.competitors.map((comp: any) => ({
        competitor: comp.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { competitor } = await params;
    const comp = subsafeData.competitors.find((c: any) => c.slug === competitor);

    if (!comp) return { title: 'Not Found' };

    return {
        title: `${comp.title} | SubSafe`,
        description: comp.solution_summary,
        alternates: {
            canonical: `/vs/${competitor}`,
        },
        openGraph: {
            title: comp.title,
            description: comp.solution_summary,
            url: `/vs/${competitor}`,
        }
    };
}

export default async function CompetitorPage({ params }: Props) {
    const { competitor } = await params;
    const comp = subsafeData.competitors.find((c: any) => c.slug === competitor);

    if (!comp) return <PseoLayout><h1>Not Found</h1></PseoLayout>;

    const relatedBlogs = blogsData
        .filter(blog => blog.title.toLowerCase().includes(comp.title.toLowerCase()) ||
            (comp.primary_keyword && (blog.metadata?.keywords?.includes(comp.primary_keyword) || blog.title.toLowerCase().includes(comp.primary_keyword.toLowerCase()))) ||
            blog.slug.includes(comp.slug))
        .slice(0, 4);

    const faqSchema = comp.faq?.length ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": comp.faq.map((f: any) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    } : null;

    return (
        <PseoLayout>
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            <div className="mb-12">
                <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">Comparison</span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-6">{comp.title}</h1>
                <p className="text-xl text-gray-500 leading-relaxed">{comp.solution_summary}</p>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-brand-black">Why people switch</h2>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        {comp.pain_points.map((point: string, i: number) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </section>

                {/* Related Blogs Injection */}
                {relatedBlogs.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-brand-black mb-6">Learn more about {comp.title}</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedBlogs.map(post => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                                    <article className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-2 group cursor-pointer flex flex-col h-full">
                                        <div className="h-48 overflow-hidden relative">
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-black shadow-sm">
                                                {post.category}
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-4">
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold font-display text-brand-black mb-3 group-hover:text-brand-orange transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt={post.author} />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600">{post.author}</span>
                                                </div>
                                                <span className="text-brand-orange font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                    Read Article <ArrowRight size={12} />
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <InternalLinkingBlock productData={subsafeData} />
        </PseoLayout>
    );
}
