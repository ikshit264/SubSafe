'use client';

import React from 'react';
import { BLOG_POSTS, APP_NAME } from '@/constants';
import { NeoButton } from './ui/NeoButton';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogPageProps {
   onNavigate: (view: any, id?: number) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
   return (
      <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-lime selection:text-black dark:text-gray-800">
         {/* Navbar */}
         <nav className="fixed w-full top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
               <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
                  <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold text-lg transform -rotate-6 shadow-sm">
                     S
                  </div>
                  <span className="text-xl font-display font-bold text-brand-black">{APP_NAME}</span>
               </div>
               <div className="flex items-center gap-3">
                  <button onClick={() => onNavigate('landing')} className="text-sm font-medium hover:text-brand-orange hidden md:block text-gray-500">Home</button>
                  <NeoButton onClick={() => onNavigate('signup')} variant="primary" size="sm">Get Started</NeoButton>
               </div>
            </div>
         </nav>

         <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-20">
               <span className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-2 block">The SubSafe Blog</span>
               <h1 className="text-5xl font-display font-bold text-brand-black mb-6">Mastering Reddit Marketing</h1>
               <p className="text-xl text-gray-500">Guides, case studies, and strategies to help you grow on Reddit without getting banned.</p>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {BLOG_POSTS.map((post) => (
                  <article
                     key={post.id}
                     className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-2 group cursor-pointer flex flex-col h-full"
                     onClick={() => onNavigate('blog-post', post.id)}
                  >
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
                        <h2 className="text-xl font-bold font-display text-brand-black mb-3 group-hover:text-brand-orange transition-colors">
                           {post.title}
                        </h2>
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
               ))}
            </div>

            {/* Newsletter CTA */}
            <div className="mt-24 bg-brand-black rounded-[32px] p-12 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
               <div className="relative z-10 max-w-lg mx-auto">
                  <h2 className="text-3xl font-display font-bold text-white mb-4">Don't miss a beat</h2>
                  <p className="text-gray-400 mb-8">Join 10,000+ founders getting weekly Reddit growth hacks.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                     <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-grow px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime"
                     />
                     <NeoButton variant="accent">Subscribe</NeoButton>
                  </div>
               </div>
            </div>
         </main>

         {/* Footer */}
         <footer className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
               <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
                  <div className="w-6 h-6 bg-brand-orange rounded-md flex items-center justify-center text-white font-bold text-xs transform -rotate-6">S</div>
                  <span className="font-bold text-brand-black">{APP_NAME}</span>
               </div>
               <div className="flex gap-6">
                  <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
                  <button onClick={() => onNavigate('landing')} className="hover:text-black transition-colors">Home</button>
               </div>
               <p>© 2024 {APP_NAME} Inc.</p>
            </div>
         </footer>
      </div>
   );
};