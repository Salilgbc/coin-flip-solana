'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface Props {
  isLoading: boolean;
  handleFlip: () => void;
  balance: number | null;
  betAmount: number;
}

export const FlipButton: FC<Props> = ({ isLoading, handleFlip, balance, betAmount }) => {
  const { connected } = useWallet();
  const isDisabled = !connected || isLoading || (balance !== null && balance < betAmount);

  const getButtonContent = () => {
    if (!connected) {
      return (
        <>
          <span className="text-sm">Connect Wallet</span>
          <span className="text-xl opacity-75">👛</span>
        </>
      );
    }

    if (isLoading) {
      return (
        <>
          <span className="text-xl animate-spin">🎲</span>
          <span className="text-sm">Flipping...</span>
        </>
      );
    }

    if (balance !== null && balance < betAmount) {
      return (
        <>
          <span className="text-sm">Insufficient Balance</span>
          <span className="text-xl opacity-75">⚠️</span>
        </>
      );
    }

    return (
      <>
        <span className="text-sm">Flip Coin</span>
        <span className="text-xl opacity-90 group-hover:opacity-100">🎲</span>
      </>
    );
  };

  return (
    <button
      onClick={handleFlip}
      disabled={isDisabled}
      className={`group w-full py-4 px-6 rounded-2xl text-sm font-medium 
                 flex items-center justify-center space-x-3 transition-all duration-200
                 ${!connected
                   ? 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
                   : isLoading 
                   ? 'bg-white/10 text-white cursor-not-allowed border border-white/20'
                   : balance !== null && balance < betAmount
                   ? 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
                   : 'bg-white text-gray-900 hover:bg-gray-100 border border-white'
                 }
                 ${isDisabled ? 'opacity-90' : 'hover:-translate-y-0.5'}`}
    >
      {getButtonContent()}
    </button>
  );
};
