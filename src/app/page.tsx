'use client';

import React, { useEffect, useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.id) {
            setIsLoggedIn(true);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleNavigate = (view: string, id?: number) => {
    if (view === 'login') router.push('/login');
    else if (view === 'signup') router.push('/signup');
    else if (view === 'dashboard') router.push('/dashboard');
    else if (view === 'blog') router.push('/blog');
    else if (view === 'blog-post' && id) router.push(`/blog/${id}`);
    else router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <LandingPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} />;
}
