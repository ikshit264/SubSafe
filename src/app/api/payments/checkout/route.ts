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

        const apiKey = process.env.DODO_PAYMENTS_API_KEY;
        if (!apiKey || apiKey === 'YOUR_DODO_KEY') {
            return NextResponse.json({ error: 'Dodo Payments API Key is not configured' }, { status: 500 });
        }

        // The user specified to make it live, not test. 
        // Based on the docs, the live API endpoint is typically https://api.dodopayments.com
        const baseUrl = 'https://live.dodopayments.com';

        const response = await fetch(`${baseUrl}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                product_cart: [{ product_id: productId, quantity: 1 }],
                payment_link: true,
                return_url: `${process.env.BASE_URL || 'http://localhost:3000'}/dashboard?payment=success`,
                metadata: {
                    userId: user.userId || user.id,
                },
            }),
        });

        // Read raw text first to avoid JSON parse errors on empty responses
        const responseText = await response.text();
        console.log(`Dodo API response [${response.status}]:`, responseText.substring(0, 500));

        if (!responseText) {
            console.error('Dodo Payments returned empty response. Status:', response.status);
            return NextResponse.json({ error: 'Payment provider returned an empty response. Please check your API key and product ID.' }, { status: 502 });
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch {
            console.error('Dodo Payments returned non-JSON:', responseText.substring(0, 300));
            return NextResponse.json({ error: 'Payment provider returned an invalid response.' }, { status: 502 });
        }

        if (!response.ok) {
            console.error('Dodo Payments Error:', data);
            return NextResponse.json({ error: data.message || data.error || 'Payment initiation failed' }, { status: response.status });
        }

        // Dodo returns payment_link or checkout_url depending on the endpoint
        const checkoutUrl = data.payment_link || data.checkout_url;
        if (!checkoutUrl) {
            console.error('No checkout URL in Dodo response:', data);
            return NextResponse.json({ error: 'No checkout URL received from payment provider.' }, { status: 502 });
        }

        return NextResponse.json({ url: checkoutUrl });
    } catch (err) {
        console.error('Checkout API Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
