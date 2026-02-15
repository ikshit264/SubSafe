'use client';

import React, { useEffect } from 'react';
import { BLOG_POSTS, APP_NAME } from '@/constants';
import { NeoButton } from './ui/NeoButton';
import { ArrowLeft, Clock, Share2, Twitter, Linkedin } from 'lucide-react';

interface BlogPostPageProps {
   id: number;
   onNavigate: (view: any, id?: number) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ id, onNavigate }) => {
   const post = BLOG_POSTS.find(p => p.id === id);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   if (!post) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-brand-bg">
            <div className="text-center">
               <h1 className="text-2xl font-bold mb-4 dark:text-black">Post not found</h1>
               <NeoButton onClick={() => onNavigate('blog')}>Back to Blog</NeoButton>
            </div>
         </div>
      );
   }

   const relatedPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 2);

   return (
      <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-lime selection:text-black dark:text-gray-800">
         {/* Navbar */}
         <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
               <button
                  onClick={() => onNavigate('blog')}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-black transition-colors"
               >
                  <ArrowLeft size={18} /> Back to Blog
               </button>

               <div className="flex items-center gap-3">
                  <NeoButton onClick={() => onNavigate('signup')} variant="primary" size="sm">Get Started</NeoButton>
               </div>
            </div>
         </nav>

         {/* Hero Section */}
         <main className="pt-32 pb-24 px-6">
            <article className="max-w-3xl mx-auto">
               <div className="mb-8 flex items-center gap-3">
                  <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold uppercase tracking-wide">
                     {post.category}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
               </div>

               <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-8 leading-tight">
                  {post.title}
               </h1>

               <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-white shadow-sm">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt={post.author} />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-brand-black">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.date}</div>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-500 transition-colors"><Twitter size={14} /></button>
                     <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"><Linkedin size={14} /></button>
                     <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-black transition-colors"><Share2 size={14} /></button>
                  </div>
               </div>

               {/* Content Body */}
               <div
                  className="prose prose-lg prose-slate max-w-none 
               prose-headings:font-display prose-headings:font-bold prose-headings:text-brand-black
               prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline
               prose-img:rounded-3xl prose-img:shadow-soft-lg prose-img:border prose-img:border-gray-100
               prose-p:text-gray-600 prose-p:leading-relaxed
               prose-li:text-gray-600
               "
               >
                  <img src={post.imageUrl} alt={post.title} className="w-full h-[400px] object-cover mb-10 rounded-[32px]" />
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
               </div>

               {/* Author Bio / CTA */}
               <div className="mt-16 bg-gray-50 rounded-[24px] p-8 border border-gray-200 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="w-20 h-20 rounded-full bg-white p-1 shadow-sm shrink-0">
                     <div className="w-full h-full rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-2xl transform -rotate-6">S</div>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-brand-black mb-2">Write safer Reddit posts</h3>
                     <p className="text-gray-600 mb-4 text-sm">SubSafe analyzes your content against thousands of subreddit rules to prevent bans before they happen.</p>
                     <NeoButton onClick={() => onNavigate('signup')} size="sm">Try SubSafe Free</NeoButton>
                  </div>
               </div>
            </article>

            {/* Related Posts */}
            <div className="max-w-5xl mx-auto mt-24 border-t border-gray-200 pt-16">
               <h3 className="text-2xl font-display font-bold text-brand-black mb-8">Read Next</h3>
               <div className="grid md:grid-cols-2 gap-8">
                  {relatedPosts.map(post => (
                     <div
                        key={post.id}
                        className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-soft transition-all cursor-pointer group"
                        onClick={() => onNavigate('blog-post', post.id)}
                     >
                        <div className="text-xs font-bold text-brand-orange uppercase mb-2">{post.category}</div>
                        <h4 className="text-lg font-bold text-brand-black mb-2 group-hover:text-brand-orange transition-colors">{post.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                     </div>
                  ))}
               </div>
            </div>
         </main>

         {/* Footer */}
         <footer className="bg-white py-12 border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
               <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
                  <div className="w-6 h-6 bg-brand-orange rounded-md flex items-center justify-center text-white font-bold text-xs transform -rotate-6">S</div>
                  <span className="font-bold text-brand-black">{APP_NAME}</span>
               </div>
               <div className="flex gap-6">
                  <button onClick={() => onNavigate('blog')} className="hover:text-black transition-colors text-gray-500">Blog</button>
                  <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
               </div>
               <p>© 2024 {APP_NAME} Inc.</p>
            </div>
         </footer>
      </div>
   );
};