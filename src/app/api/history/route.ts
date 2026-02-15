import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function GET() {
    try {
        const payload = await getUserFromToken() as any;
        if (!payload || !payload.userId) {
            return NextResponse.json({ history: [] });
        }

        const items = await prisma.analysisRequest.findMany({
            where: { userId: payload.userId },
            orderBy: { createdAt: 'desc' }
        });

        // Map Prisma items to UI HistoryItem type
        const history = items.map((item: any) => ({
            id: item.id,
            date: item.createdAt.toLocaleDateString(),
            draft: {
                subreddit: item.subreddit,
                title: item.title,
                body: item.body
            },
            result: JSON.parse(item.result)
        }));

        return NextResponse.json({ history });
    } catch (err) {
        console.error('History API Error:', err);
        return NextResponse.json({ error: 'Failed to fetch history', history: [] }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const payload = await getUserFromToken() as any;
        if (!payload || !payload.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.analysisRequest.deleteMany({
            where: { userId: payload.userId }
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('History API Error:', err);
        return NextResponse.json({ error: 'Failed to clear history' }, { status: 500 });
    }
}
