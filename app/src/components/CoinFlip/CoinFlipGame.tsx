'use client';

import { FC, useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletConnectionError } from '@solana/wallet-adapter-base';
import { Coin } from './Coin';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const Toast: FC<ToastProps> = ({ message, type }) => (
  <div className={`toast ${type === 'error' ? 'bg-red-900/80' : 'bg-green-900/80'} animate-fade-in font-medium tracking-wide`}>
    {message}
  </div>
);

export const CoinFlipGame: FC = () => {
  const { publicKey, connected, connecting } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number>(1);
  const [choice, setChoice] = useState<'heads' | 'tails'>('heads');
  const [isLoading, setIsLoading] = useState(false);
  const [isAirdropping, setIsAirdropping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);

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

    if (connected) {
      fetchBalance();
      const intervalId = setInterval(fetchBalance, 5000);
      return () => clearInterval(intervalId);
    } else {
      setBalance(null);
    }
  }, [publicKey, connection, connected]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFlip = async () => {
    if (!publicKey || !connected || balance === null) return;
    if (balance < betAmount) {
      showToast('Insufficient balance!', 'error');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      setResult(null);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 35% chance of winning (house edge)
      const randomValue = Math.random();
      const flipResult = randomValue < 0.35 ? choice : (choice === 'heads' ? 'tails' : 'heads');
      setResult(flipResult);
      
      if (flipResult === choice) {
        showToast('YOU WON! 🎉', 'success');
      } else {
        showToast('BETTER LUCK NEXT TIME! 🎲', 'error');
      }
    } catch (error) {
      console.error('Error flipping coin:', error);
      if (error instanceof WalletConnectionError) {
        showToast('Wallet connection was rejected', 'error');
      } else {
        showToast('Failed to flip coin', 'error');
      }
    } finally {
      setIsLoading(false);
      if (publicKey && connected) {
        try {
          const newBalance = await connection.getBalance(publicKey);
          setBalance(newBalance / LAMPORTS_PER_SOL);
        } catch (balanceError) {
          console.error('Error fetching balance post-flip:', balanceError);
          setError('Failed to update balance');
        }
      }
    }
  };

  const requestAirdrop = async () => {
    if (!publicKey) return;
    setIsAirdropping(true);
    try {
      const airdropAmount = 2 * LAMPORTS_PER_SOL;
      const sig = await connection.requestAirdrop(publicKey, airdropAmount);
      await connection.confirmTransaction(sig);
      const newBalance = await connection.getBalance(publicKey);
      setBalance(newBalance / LAMPORTS_PER_SOL);
      showToast('Airdrop successful! +2 SOL', 'success');
    } catch (err) {
      console.error('Airdrop failed:', err);
      showToast('Airdrop failed - Try again', 'error');
    } finally {
      setIsAirdropping(false);
    }
  };

  return (
    <div className="w-full min-h-screen max-w-7xl mx-auto flex items-center justify-center p-4">
      <div className="game-panel w-full max-w-2xl animate-fade-in px-8 py-12">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400 mb-12 tracking-wider uppercase">
          SOL COIN FLIP
        </h1>
        
        <div className="mb-12">
          <Coin side={result} isFlipping={isLoading} />
        </div>

        {error && (
          <div className="px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm w-full mb-8 animate-fade-in tracking-wide">
            {error}
          </div>
        )}

        {!connected && !connecting && (
          <div className="px-6 py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-gray-400 text-sm w-full mb-8 animate-fade-in font-medium tracking-wide">
            CONNECT YOUR WALLET TO PLAY
          </div>
        )}
        {connecting && (
          <div className="px-6 py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-gray-400 text-sm w-full mb-8 animate-pulse font-medium tracking-wide">
            CONNECTING...
          </div>
        )}

        {/* Coin Choice Section */}
        <div className="flex flex-col items-center gap-8 w-full mb-12">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400 tracking-widest">I CHOOSE</span>
          <div className="flex justify-between w-full max-w-lg gap-6">
            <button
              className={`bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 font-black py-5 px-10 rounded-xl w-[200px] transition-all duration-200 hover:brightness-110 transform hover:scale-105 active:scale-95 shadow-lg hover-glow tracking-wider ${choice === 'heads' ? 'ring-4 ring-offset-4 ring-offset-[#1a202c] ring-yellow-400' : ''}`}
              onClick={() => setChoice('heads')}
              disabled={isLoading}
            >
              HEADS
            </button>
            <button
              className={`bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 font-black py-5 px-10 rounded-xl w-[200px] transition-all duration-200 hover:brightness-110 transform hover:scale-105 active:scale-95 shadow-lg hover-glow tracking-wider ${choice === 'tails' ? 'ring-4 ring-offset-4 ring-offset-[#1a202c] ring-yellow-400' : ''}`}
              onClick={() => setChoice('tails')}
              disabled={isLoading}
            >
              TAILS
            </button>
          </div>
        </div>

        {/* Bet Amount Section */}
        <div className="flex flex-col items-center gap-8 w-full mb-12">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400 tracking-widest">BET AMOUNT</span>
          <div className="flex justify-between w-full max-w-lg gap-4">
            {[1, 2, 3].map((amount) => (
              <button
                key={amount}
                className={`bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 font-black py-5 px-10 rounded-xl w-[120px] transition-all duration-200 hover:brightness-110 transform hover:scale-105 active:scale-95 shadow-lg hover-glow tracking-wider ${betAmount === amount ? 'ring-4 ring-offset-4 ring-offset-[#1a202c] ring-yellow-400' : ''} ${balance !== null && balance < amount ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => setBetAmount(amount)}
                disabled={isLoading || (balance !== null && balance < amount)}
              >
                {amount} SOL
              </button>
            ))}
          </div>
        </div>

        {/* Bet Button */}
        <button
          className={`bet-button bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-black py-6 px-20 rounded-xl min-w-[240px] transition-all duration-200 hover:brightness-110 transform hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-2xl tracking-widest hover-glow`}
          onClick={handleFlip}
          disabled={!connected || isLoading || balance === null || balance < betAmount}
        >
          {isLoading ? "FLIPPING..." : "PLACE BET"}
        </button>

        {connected && balance !== null && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="text-lg text-yellow-200/90 font-medium tracking-wide">
              BALANCE: {balance.toFixed(2)} SOL
            </div>
            <button
              className="text-sm bg-gradient-to-br from-purple-400 to-purple-500 text-gray-900 font-black py-4 px-8 rounded-xl transition-all duration-200 hover:brightness-110 transform hover:scale-105 active:scale-95 shadow-lg hover-glow tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={requestAirdrop}
              disabled={isAirdropping}
            >
              {isAirdropping ? 'AIRDROPPING...' : 'GET TEST SOL'}
            </button>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};
