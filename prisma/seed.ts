import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            name: "Starter",
            price: "$0",
            features: ["3 Post Checks / Day", "Basic Grammar Check", "Single Subreddit Support"],
            color: "bg-white",
            cta: "Start Free",
            productId: "free_tier",
            active: true,
        },
        {
            name: "Pro Creator",
            price: "$9",
            features: ["Unlimited Checks", "Deep Rule Analysis", "Auto-Rewriter", "Ban History Protection"],
            color: "bg-brand-yellow",
            cta: "Go Pro",
            productId: process.env.DODO_PRO_PLAN_ID || "pdt_0NYUSqGhcvA2Y23XGKOYn",
            active: true,
        },
        {
            name: "Agency",
            price: "$29",
            features: ["Multiple Accounts", "API Access", "Bulk Upload", "Priority Support"],
            color: "bg-brand-orange",
            cta: "Plan Agency",
            productId: process.env.DODO_AGENCY_PLAN_ID || "pdt_0NYUSuMy2q91d0ALOcHJj",
            active: true,
        }
    ];

    console.log('Seeding products from environment variables...');
    for (const product of products) {
        await prisma.product.upsert({
            where: { productId: product.productId },
            update: product,
            create: product,
        });
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
