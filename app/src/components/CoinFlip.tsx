'use client';

import { FC, useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { BetAmounts, CoinChoice, FlipButton } from './CoinFlip';

export const CoinFlip: FC = () => {
  const { publicKey, connected, connecting } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0.1);
  const [choice, setChoice] = useState<'heads' | 'tails'>('heads');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey || !connected) {
        setBalance(null);
        return;
      }
      try {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
        setError(null);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Failed to fetch balance');
      }
    };

    fetchBalance();
    const intervalId = setInterval(fetchBalance, 5000);

    return () => clearInterval(intervalId);
  }, [publicKey, connection, connected]);

  const handleFlip = async () => {
    if (!publicKey || !connected || !balance) return;
    if (balance < betAmount) {
      setError('Insufficient balance!');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement smart contract interaction
      console.log(`Flipping coin with ${betAmount} SOL on ${choice}`);
    } catch (error) {
      console.error('Error flipping coin:', error);
      setError('Failed to flip coin');
    } finally {
      setIsLoading(false);
    }
  };

  if (!publicKey || !connected) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          {connecting ? 'Connecting Wallet...' : 'Connect your wallet to play'}
        </h2>
        {connecting && (
          <div className="animate-spin text-4xl inline-block">🎲</div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Solana Flip</h1>
        <div className="text-right">
          <div className="text-sm text-gray-400">Your Balance</div>
          <div className="text-lg font-bold text-purple-400">
            {balance === null ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              `${balance.toFixed(3)} SOL`
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <BetAmounts
          balance={balance}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
        />

        <CoinChoice
          choice={choice}
          setChoice={setChoice}
          isLoading={isLoading}
        />

        <FlipButton
          isLoading={isLoading}
          handleFlip={handleFlip}
          balance={balance}
          betAmount={betAmount}
        />
      </div>
    </div>
  );
};
