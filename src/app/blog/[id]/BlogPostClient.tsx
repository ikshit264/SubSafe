'use client';

import { BlogPostPage } from '@/components/BlogPostPage';
import { useRouter, useParams } from 'next/navigation';

export default function BlogPostClient({ posts }: { posts: any[] }) {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const handleNavigate = (view: string, navigateId?: string | number) => {
        if (view === 'blog') router.push('/blog');
        else if (view === 'landing') router.push('/');
        else if (view === 'login') router.push('/login');
        else if (view === 'signup') router.push('/signup');
        else if (view === 'dashboard') router.push('/dashboard');
        else if (view === 'blog-post' && navigateId) router.push(`/blog/${navigateId}`);
        else router.push('/');
    };

    if (!id) return null;

    return <BlogPostPage id={id} posts={posts} onNavigate={handleNavigate} />;
}
