import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const user: any = await getUserFromToken();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name } = await req.json();

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const updated = await prisma.user.update({
            where: { id: user.userId },
            data: { name: name.trim() },
            select: { id: true, name: true, email: true },
        });

        return NextResponse.json({ success: true, user: updated });
    } catch (err) {
        console.error('Update profile error:', err);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
