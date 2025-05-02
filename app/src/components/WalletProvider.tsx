'use client';

import { FC, ReactNode, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

const LoadingComponent = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="h-[40px] w-[180px] bg-gray-700 rounded animate-pulse" />
  </div>
);

// Dynamically import wallet modal to prevent SSR
const WalletModalProvider = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider),
  { 
    ssr: false,
    loading: () => <LoadingComponent />
  }
);

interface Props {
  children: ReactNode;
}

const ClientWalletProvider: FC<Props> = ({ children }) => {
  const network = 'devnet';
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={true}
        onError={(error) => {
          console.error('Wallet error:', error);
        }}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const WalletContextProvider: FC<Props> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ClientWalletProvider>
        {children}
      </ClientWalletProvider>
    </Suspense>
  );
};
