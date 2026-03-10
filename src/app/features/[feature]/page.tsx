import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { PseoLayout } from '@/components/pSEO/PseoLayout';
import { InternalLinkingBlock } from '@/components/pSEO/InternalLinkingBlock';
import subsafeData from '@/seo-data/products/subsafe.json';
import blogsData from '@/seo-data/blogs.json';

type Props = {
    params: Promise<{ feature: string }>;
};

export async function generateStaticParams() {
    return subsafeData.features.map((f: any) => ({
        feature: f.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { feature } = await params;
    const feat = subsafeData.features.find((f: any) => f.slug === feature);

    if (!feat) return { title: 'Not Found' };

    return {
        title: `${feat.title} | SubSafe`,
        description: feat.solution_summary,
        alternates: {
            canonical: `/features/${feature}`,
        },
        openGraph: {
            title: feat.title,
            description: feat.solution_summary,
            url: `/features/${feature}`,
        }
    };
}

export default async function FeaturePage({ params }: Props) {
    const { feature } = await params;
    const feat = subsafeData.features.find((f: any) => f.slug === feature);

    if (!feat) return <PseoLayout><h1>Not Found</h1></PseoLayout>;

    const relatedBlogs = blogsData
        .filter(blog => blog.title.toLowerCase().includes(feat.title.toLowerCase()) ||
            (feat.primary_keyword && (blog.metadata?.keywords?.includes(feat.primary_keyword) || blog.title.toLowerCase().includes(feat.primary_keyword.toLowerCase()))) ||
            blog.slug.includes(feat.slug))
        .slice(0, 4);

    return (
        <PseoLayout>
            <div className="mb-12">
                <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">Feature Deep-Dive</span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-6">{feat.title}</h1>
                <p className="text-xl text-gray-500 leading-relaxed">{feat.solution_summary}</p>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-brand-black">Common Pain Points</h2>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        {feat.pain_points.map((point: string, i: number) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-brand-black">Deep Dive: {feat.title}</h2>
                    <p className="mt-4">By specifically optimizing for {feat.primary_keyword}, SubSafe's {feat.title} directly tackles these issues at scale.</p>
                </section>

                {/* Related Blogs Injection */}
                {relatedBlogs.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-brand-black mb-6">Read more about {feat.title}</h2>
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
