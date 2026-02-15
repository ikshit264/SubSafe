export interface PostDraft {
  subreddit: string;
  title: string;
  body: string;
}

export interface AnalysisResult {
  isCompliant: boolean;
  score: number;
  violations: string[];
  suggestions: string[];
  rewrittenContent: string;
  rulesChecked: string[];
  viralScore: {
    score: number;
    reasoning: string;
  };
  sentiment: {
    promotional: number;
    helpful: number;
    controversial: number;
  };
  betterTitles: string[];
  id?: string | null;
  isGuest?: boolean;
  creditsRemaining?: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  content: string;
}
