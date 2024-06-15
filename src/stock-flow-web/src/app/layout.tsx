import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Stock Flow",
    description: "Stock Flow é o melhor sistema de gerenciamento de estoque.",
    icons: [
        {
            rel: "icon",
            url: "/favicon.ico",
        },
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
