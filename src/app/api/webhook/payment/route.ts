import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.text();
        // Header names according to Dodo Payments documentation
        const webhookSignature = req.headers.get('webhook-signature');
        const webhookId = req.headers.get('webhook-id');
        const webhookTimestamp = req.headers.get('webhook-timestamp');

        if (!webhookSignature) {
            return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
        }

        const event = JSON.parse(body);
        console.log('Received Dodo Webhook:', event.type);

        // Process successful payment
        if (event.type === 'payment.succeeded') {
            const data = event.data;
            const metadata = data?.metadata;
            const userId = metadata?.userId;
            const productId = data?.product_cart?.[0]?.product_id || 'unknown';

            if (userId) {
                console.log(`Processing successful payment for User: ${userId}`);

                // Look up the Plan corresponding to the Dodo product ID
                const planRecord = await prisma.plan.findFirst({
                    where: { dodoProductId: productId }
                });

                if (!planRecord) {
                    console.error(`Plan not found for Dodo product ID: ${productId}`);
                    return NextResponse.json({ error: 'Plan not found' }, { status: 400 });
                }

                // 1. Record the payment
                await prisma.payment.create({
                    data: {
                        userId: userId,
                        planId: planRecord.id,
                        amount: data.total_amount ? data.total_amount / 100 : 0, // Convert from cents
                        currency: data.currency || 'USD',
                        status: 'succeeded',
                        dodoId: data.payment_id
                    }
                });

                // 2. Determine plan from the Plan model
                let plan = 'pro'; // Default to pro for any paid product
                const productNameLower = planRecord.name.toLowerCase();
                if (productNameLower.includes('agency')) {
                    plan = 'agency';
                } else if (productNameLower.includes('pro')) {
                    plan = 'pro';
                }

                // 3. Update user plan
                await prisma.user.update({
                    where: { id: userId },
                    data: { plan: plan }
                });

                console.log(`Updated user ${userId} to plan: ${plan}`);
            }
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('Dodo Webhook Error:', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
