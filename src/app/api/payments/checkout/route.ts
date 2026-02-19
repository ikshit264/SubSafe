import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { productId } = await req.json();
        const user: any = await getUserFromToken();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify productId exists in our DB
        const product = await prisma.product.findUnique({
            where: { productId }
        });

        if (!product) {
            return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
        }

        // Fetch full user details for the customer object
        const fullUser = await prisma.user.findUnique({
            where: { id: user.userId || user.id }
        });

        if (!fullUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Dodo Payments Static Checkout Links
        // We append metadata via query parameters: metadata_{key}={value}
        // This ensures the webhook knows who made the purchase (userId)
        
        let checkoutUrl = `https://checkout.dodopayments.com/buy/${productId}?quantity=1`;
        
        // Append metadata manually
        checkoutUrl += `&metadata_userId=${fullUser.id}`;
        // Also append success URL to redirect back to dashboard
        checkoutUrl += `&redirect_url=${encodeURIComponent(`${process.env.BASE_URL || 'http://localhost:3000'}/dashboard?payment=success`)}`;

        return NextResponse.json({ url: checkoutUrl });
    } catch (err) {
        console.error('Checkout API Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
