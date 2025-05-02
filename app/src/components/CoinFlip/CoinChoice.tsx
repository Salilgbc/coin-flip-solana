import { FC } from 'react';

interface CoinChoiceProps {
  choice: 'heads' | 'tails';
  setChoice: (choice: 'heads' | 'tails') => void;
  isLoading: boolean;
}

export const CoinChoice: FC<CoinChoiceProps> = ({ choice, setChoice, isLoading }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xl font-bold text-foreground">I LIKE</span>
      <div className="flex gap-4">
        <button
          className={`btn-primary min-w-[100px] ${choice === 'heads' ? 'btn-active' : ''}`}
          onClick={() => setChoice('heads')}
          disabled={isLoading}
        >
          HEADS
        </button>
        <button
          className={`btn-primary min-w-[100px] ${choice === 'tails' ? 'btn-active' : ''}`}
          onClick={() => setChoice('tails')}
          disabled={isLoading}
        >
          TAILS
        </button>
      </div>
    </div>
  );
};
