'use client';

import { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const WalletButton: FC = () => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <WalletMultiButton 
        className="
          !bg-gradient-to-br !from-yellow-400 !to-yellow-500 
          !text-gray-900 !font-black !rounded-xl !py-4 !px-8 
          !transition-all !duration-200 hover:!brightness-110 
          !transform hover:!scale-105 active:!scale-95 
          !shadow-lg !hover-glow !tracking-wider !uppercase
          disabled:!opacity-50 disabled:!cursor-not-allowed 
          disabled:!transform-none
        "
      />
    </div>
  );
};
