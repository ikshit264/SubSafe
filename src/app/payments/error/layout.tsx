import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Failed",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PaymentErrorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
