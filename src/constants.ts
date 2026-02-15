import { BlogPost } from './types';

export const APP_NAME = "SubSafe";

export const POPULAR_SUBREDDITS = ["startups", "entrepreneur", "marketing", "webdev", "sideproject", "askreddit", "SaaS"];



export const FEATURES = [
  {
    title: "Instant Rule Check",
    description: "AI checks your post against the latest sidebar rules of any subreddit in seconds.",
    icon: "⚡"
  },
  {
    title: "Shadowban Evasion",
    description: "Detects keywords and phrases that trigger Reddit's automod filters.",
    icon: "🛡️"
  },
  {
    title: "Tone Matching",
    description: "Analyses top posts to help you mimic the community's preferred writing style.",
    icon: "🎭"
  },
  {
    title: "One-Click Rewrite",
    description: "Don't just get errors. Get a fixed, ready-to-post version instantly.",
    icon: "✍️"
  }
];

export const FAQS = [
  {
    question: "Does this guarantee I won't get banned?",
    answer: "While we can't guarantee 100% safety as mods are human, SubSafe catches 95% of common rule violations that lead to auto-removals."
  },
  {
    question: "Do I need to provide my Reddit password?",
    answer: "No! We use Reddit's official secure OAuth for login (simulated for this demo). We never see or store your password."
  },
  {
    question: "Can I use it for free?",
    answer: "Yes! The Starter plan gives you 3 free checks every single day. No credit card required."
  },
  {
    question: "Which subreddits are supported?",
    answer: "SubSafe works with any public subreddit. Our AI retrieves the latest rules dynamically from its knowledge base."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-launch-on-reddit-without-getting-banned",
    title: "How to Launch on Reddit Without Getting Banned (A Complete Guide)",
    excerpt: "The subtle art of self-promotion on Reddit. Learn why 90% of launch posts fail and how to be in the 10% that go viral.",
    author: "Alex Rivera",
    date: "Oct 12, 2024",
    category: "Growth Strategy",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    content: `
      <p>Reddit is the graveyard of good ideas. Not because the ideas are bad, but because the execution is terrible. If you treat Reddit like Twitter or LinkedIn, you will be eaten alive.</p>
      
      <h3>The "Value First" Rule</h3>
      <p>The number one reason posts get removed from r/startups or r/entrepreneur is a lack of value. If your post exists solely to drive traffic to your link, mods will smell it from a mile away.</p>
      <p>Your post needs to stand alone. A user should be able to read your entire post, learn something valuable, and never click your link—and still be satisfied.</p>

      <h3>The 9:1 Ratio</h3>
      <p>Old school Redditors swear by the 9:1 rule: for every 1 self-promotional post, you should have 9 contributions to the community (comments, helpful posts, discussions).</p>
      
      <h3>Common Red Flags for Automod</h3>
      <ul>
        <li>Using URL shorteners (bit.ly, etc.)</li>
        <li>Fresh accounts with 0 karma</li>
        <li>Direct affiliate links</li>
        <li>Title using all caps or clickbait ("YOU WON'T BELIEVE...")</li>
      </ul>
      
      <p>SubSafe helps you identify these triggers before you hit submit.</p>
    `
  },
  {
    id: 2,
    slug: "anatomy-of-a-viral-post",
    title: "The Anatomy of a Viral r/Startups Post",
    excerpt: "We analyzed 500 top posts from last year. Here are the 3 patterns that consistently hit the front page.",
    author: "Sarah Chen",
    date: "Sep 28, 2024",
    category: "Case Study",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    content: `
      <p>Viral posts aren't accidents. They follow a structure. We scraped data from the top 500 posts on r/startups and found three distinct archetypes.</p>

      <h3>1. The "I Failed" Post</h3>
      <p>Redditors love vulnerability. Posts titled "How I lost $50k" often outperform "How I made $50k" by a factor of 3x. Why? Because failure feels authentic. Success feels like marketing.</p>

      <h3>2. The Detailed Case Study</h3>
      <p>Don't just say "I improved SEO." Show the graphs. Share the specific keywords. Break down the exact email subject lines. The more specific the data, the more upvotes you earn.</p>

      <h3>3. The "David vs. Goliath" Narrative</h3>
      <p>Everyone loves an underdog. If you're building a tool to take on Google or Facebook, frame your story around the struggle.</p>
    `
  },
  {
    id: 3,
    slug: "shadowbanning-explained",
    title: "Am I Shadowbanned? Understanding Reddit's Silent Killer",
    excerpt: "Your posts aren't getting removed, but nobody is seeing them. You might be a victim of the spam filters.",
    author: "Mike Ross",
    date: "Sep 15, 2024",
    category: "Technical",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    content: `
      <p>Shadowbanning is when your content is invisible to everyone but you. It's Reddit's way of dealing with spammers without alerting them.</p>

      <h3>How to check if you are shadowbanned</h3>
      <p>Open your profile in an Incognito window. If you see "Page not found," you are shadowbanned.</p>

      <h3>Triggers</h3>
      <ul>
        <li>Posting the same link across multiple subreddits rapidly</li>
        <li>Copy-pasting the same comment</li>
        <li>Asking for upvotes (vote manipulation)</li>
      </ul>
      
      <p>Once you are on the spam list, it is very hard to get off. Prevention is your only cure.</p>
    `
  }
];