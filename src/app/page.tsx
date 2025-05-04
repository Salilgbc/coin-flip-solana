'use client';

import dynamic from 'next/dynamic';
import { CoinFlipGame } from '@/components/CoinFlip/CoinFlipGame';

// Dynamically import wallet components with ssr disabled
const WalletButton = dynamic(
  () => import('@/components/WalletButton').then(mod => mod.WalletButton),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <WalletButton />
      <CoinFlipGame />
    </main>
  );
}
