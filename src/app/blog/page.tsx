'use client';

import { BlogPage } from '@/components/BlogPage';
import { useRouter } from 'next/navigation';

export default function Blog() {
    const router = useRouter();

    const handleNavigate = (view: string, id?: number) => {
        if (view === 'blog-post' && id) router.push(`/blog/${id}`);
        else if (view === 'landing') router.push('/');
        else if (view === 'login') router.push('/login');
        else if (view === 'signup') router.push('/signup');
        else if (view === 'dashboard') router.push('/dashboard');
        else router.push('/');
    };

    return <BlogPage onNavigate={handleNavigate} />;
}
