import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ subreddits: [] });
    }

    try {
        const res = await fetch(`https://www.reddit.com/subreddits/search.json?q=${encodeURIComponent(query)}&limit=10`, {
            headers: {
                'User-Agent': 'subSafe-app-v1.0 (by /u/ikshit264)'
            }
        });

        if (!res.ok) {
            throw new Error(`Reddit API responded with ${res.status}`);
        }

        const data = await res.json();

        const subreddits = data.data?.children?.map((child: any) => ({
            name: child.data.display_name,
            subscribers: child.data.subscribers,
            icon: child.data.icon_img || child.data.community_icon?.split('?')[0] || null,
            description: child.data.public_description
        })) || [];

        return NextResponse.json({ subreddits });
    } catch (error: any) {
        console.error('Error fetching subreddits:', error);
        return NextResponse.json({ error: 'Failed to fetch subreddits' }, { status: 500 });
    }
}
