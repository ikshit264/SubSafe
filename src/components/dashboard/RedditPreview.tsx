'use client';

import React from 'react';
import { PostDraft } from '@/types';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';

interface RedditPreviewProps {
    draft: PostDraft;
}

export const RedditPreview: React.FC<RedditPreviewProps> = ({ draft }) => {
    return (
        <div className="bg-[#DAE0E6] min-h-[600px] p-4 font-sans text-[14px]">
            <div className="max-w-2xl mx-auto bg-white border border-[#ccc] rounded flex">
                <div className="w-10 bg-[#F8F9FA] border-r border-[#EDEFF1] p-2 flex flex-col items-center gap-1 rounded-l">
                    <ThumbsUp size={20} className="text-[#878A8C]" />
                    <span className="font-bold text-black text-xs">1</span>
                    <ThumbsUp size={20} className="text-[#878A8C] rotate-180" />
                </div>
                <div className="flex-1 p-2">
                    <div className="flex items-center gap-1 text-xs text-[#787C7E] mb-2">
                        <div className="w-5 h-5 rounded-full bg-brand-black"></div>
                        <span className="font-bold text-black hover:underline cursor-pointer">r/{draft.subreddit || 'subreddit'}</span>
                        <span>•</span>
                        <span>Posted by u/User</span>
                        <span>•</span>
                        <span>just now</span>
                    </div>
                    <h2 className="text-lg font-medium text-[#222] mb-3 leading-snug">{draft.title || 'Post Title'}</h2>
                    <div className="text-[#1A1A1B] leading-6 whitespace-pre-wrap mb-4 font-normal">
                        {draft.body || 'Post body content...'}
                    </div>
                    <div className="flex items-center gap-2 text-[#878A8C] font-bold text-xs">
                        <div className="flex items-center gap-1 p-2 hover:bg-[#F8F9FA] rounded cursor-pointer">
                            <MessageSquare size={16} /> Comments
                        </div>
                        <div className="flex items-center gap-1 p-2 hover:bg-[#F8F9FA] rounded cursor-pointer">
                            <Share2 size={16} /> Share
                        </div>
                        <div className="flex items-center gap-1 p-2 hover:bg-[#F8F9FA] rounded cursor-pointer">
                            <MoreHorizontal size={16} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 text-xs text-gray-500">
                Preview of standard Reddit Light Mode
            </div>
        </div>
    );
};
