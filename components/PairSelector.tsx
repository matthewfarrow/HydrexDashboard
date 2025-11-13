'use client';

import { TradingPair } from '@/lib/contracts';
import { formatTokenAmount } from '@/lib/web3';

interface PairSelectorProps {
  pairs: TradingPair[];
  selectedPair: TradingPair | null;
  onSelectPair: (pair: TradingPair) => void;
}

export default function PairSelector({
  pairs,
  selectedPair,
  onSelectPair,
}: PairSelectorProps) {
  return (
    <div className="bg-background-secondary border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">
        Trading Pairs
      </h2>
      
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {pairs.map((pair) => (
          <button
            key={pair.address}
            onClick={() => onSelectPair(pair)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedPair?.address === pair.address
                ? 'bg-primary/20 border-primary text-text-primary'
                : 'bg-background-tertiary border-border hover:border-border-light text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">
                {pair.token0Symbol} / {pair.token1Symbol}
              </span>
              {selectedPair?.address === pair.address && (
                <span className="text-primary text-sm">●</span>
              )}
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-text-muted">TVL:</span>
                <span className="text-text-secondary">
                  ${pair.tvl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
              {pair.currentBribes > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Current Bribes:</span>
                  <span className="text-text-secondary">
                    {pair.currentBribes.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              {pair.emissions > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Emissions:</span>
                  <span className="text-text-secondary">
                    {pair.emissions.toLocaleString(undefined, { maximumFractionDigits: 4})}
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {pairs.length === 0 && (
        <div className="text-center py-8 text-text-muted">
          No pairs available
        </div>
      )}
    </div>
  );
}

