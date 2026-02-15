'use client';

import { BlogPostPage } from '@/components/BlogPostPage';
import { useRouter, useParams } from 'next/navigation';

export default function BlogPost() {
    const router = useRouter();
    const params = useParams();
    const id = params.id ? parseInt(params.id as string) : null;

    const handleNavigate = (view: string, id?: number) => {
        if (view === 'blog') router.push('/blog');
        else if (view === 'landing') router.push('/');
        else if (view === 'login') router.push('/login');
        else if (view === 'signup') router.push('/signup');
        else if (view === 'dashboard') router.push('/dashboard');
        else if (view === 'blog-post' && id) router.push(`/blog/${id}`);
        else router.push('/');
    };

    if (!id) return null;

    return <BlogPostPage id={id} onNavigate={handleNavigate} />;
}
