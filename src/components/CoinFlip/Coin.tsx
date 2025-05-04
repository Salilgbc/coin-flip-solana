'use client';

import { FC } from 'react';

interface CoinProps {
  side: 'heads' | 'tails' | null;
  isFlipping: boolean;
}

export const Coin: FC<CoinProps> = ({ side, isFlipping }) => {
  return (
    <div className="coin-container">
      <div 
        className={`coin ${isFlipping ? 'flipping' : ''}`}
        style={{
          transform: !isFlipping && side === 'tails' ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Heads Side */}
        <div className="coin-face heads">
          <div className="w-full h-full relative">
            {/* Base gradient */}
            <div className="absolute inset-0 rounded-full overflow-hidden bg-[#ffd700]">
              <div className="absolute inset-0 bg-gradient-radial from-[#fff8dc] via-[#ffd700] to-[#b8860b]" />
            </div>
            
            {/* Solana Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-[#b8860b]/20 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-black text-[#8b4513]">S</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tails Side */}
        <div className="coin-face tails">
          <div className="w-full h-full relative">
            {/* Base gradient */}
            <div className="absolute inset-0 rounded-full overflow-hidden bg-[#ffd700]">
              <div className="absolute inset-0 bg-gradient-radial from-[#fff8dc] via-[#ffd700] to-[#b8860b]" />
            </div>
            
            {/* Pattern */}
            <div className="absolute inset-[15%] flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Concentric circles */}
                <div className="absolute inset-0 rounded-full border-2 border-[#8b4513]/40" />
                <div className="absolute inset-[20%] rounded-full border-2 border-[#8b4513]/40" />
                <div className="absolute inset-[40%] rounded-full border-2 border-[#8b4513]/40" />
                {/* Cross lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-0.5 bg-[#8b4513]/40 rotate-45" />
                  <div className="absolute w-full h-0.5 bg-[#8b4513]/40 -rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
