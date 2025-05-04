import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";

import { ClientProviders } from "@/components/ClientProviders";

const chakraPetch = Chakra_Petch({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-chakra-petch',
});

export const metadata: Metadata = {
  title: "Solana Coin Flip",
  description: "Flip a coin and win SOL!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={chakraPetch.className}>
        <ClientProviders>
          <main className="min-h-screen relative">
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
