'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const BET_AMOUNTS = [0.1, 0.2, 0.3, 0.4, 0.5];

interface Props {
  balance: number | null;
  betAmount: number;
  setBetAmount: (amount: number) => void;
}

export const BetAmounts: FC<Props> = ({ balance, betAmount, setBetAmount }) => {
  const { connected } = useWallet();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">
          Bet Amount
        </label>
        {!connected && (
          <span className="text-xs text-gray-500">
            Connect to place bets
          </span>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {BET_AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => setBetAmount(amount)}
            disabled={!connected || (balance !== null && balance < amount)}
            className={`relative py-2 px-3 rounded-2xl text-sm font-medium transition-all duration-200 
              ${betAmount === amount && connected
                ? 'bg-white text-gray-900'
                : !connected
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                : balance !== null && balance < amount
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
              } border ${
                betAmount === amount && connected
                  ? 'border-white'
                  : 'border-gray-700/50'
              }`}
          >
            {amount}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        {connected && (
          <div className="px-3 py-1.5 rounded-xl text-xs text-gray-400 bg-gray-800/50 border border-gray-700/50">
            Current Bet: {betAmount} SOL
          </div>
        )}
      </div>
    </div>
  );
};
