import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    try {
        const payload = await getUserFromToken() as any;
        if (!payload || !payload.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const item = await prisma.analysisRequest.findUnique({
            where: {
                id: id,
                userId: payload.userId
            }
        });

        if (!item) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({
            item: {
                id: item.id,
                date: item.createdAt.toLocaleDateString(),
                draft: {
                    subreddit: item.subreddit,
                    title: item.title,
                    body: item.body
                },
                result: JSON.parse(item.result)
            }
        });
    } catch (err) {
        console.error('History API Error:', err);
        return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
    }
}
