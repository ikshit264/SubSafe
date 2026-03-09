import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const plans = [
        {
            name: "Hobby",
            price: 0,
            interval: "month",
            features: ["3 Post Checks / Day", "Basic Grammar Check", "Single Subreddit Support"],
            active: true,
        },
        {
            name: "Creator Plus",
            price: 9,
            interval: "month",
            features: ["Unlimited Checks", "Deep Rule Analysis", "Auto-Rewriter", "Ban History Protection"],
            dodoProductId: "p_123",
            active: true,
        },
        {
            name: "Agency",
            price: 29,
            interval: "month",
            features: ["Multiple Accounts", "API Access", "Bulk Upload", "Priority Support"],
            dodoProductId: "p_456",
            active: true,
        }
    ];

    console.log('Seeding plans...');
    for (const plan of plans) {
        await prisma.plan.upsert({
            where: { dodoProductId: plan.dodoProductId || "free_tier" },
            update: plan,
            create: {
                ...plan,
                dodoProductId: plan.dodoProductId || "free_tier"
            },
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
