'use client';

import { useState, useEffect } from 'react';
import { TradingPair, calculateBribeImpact } from '@/lib/contracts';

interface BribeCalculatorProps {
  pair: TradingPair;
}

export default function BribeCalculator({ pair }: BribeCalculatorProps) {
  const [additionalBribe, setAdditionalBribe] = useState<string>('0');
  const [totalVotingPower, setTotalVotingPower] = useState<string>('1000000');
  const [pairVotingPower, setPairVotingPower] = useState<string>('100000');
  const [bribeEfficiency, setBribeEfficiency] = useState<string>('0.7');
  const [results, setResults] = useState<ReturnType<typeof calculateBribeImpact> | null>(null);

  useEffect(() => {
    if (pair && additionalBribe) {
      const bribe = parseFloat(additionalBribe) || 0;
      const totalVP = parseFloat(totalVotingPower) || 1;
      const pairVP = parseFloat(pairVotingPower) || 0;
      const efficiency = parseFloat(bribeEfficiency) || 0.7;

      const impact = calculateBribeImpact(
        pair.tvl,
        pair.currentBribes,
        bribe,
        totalVP,
        pairVP,
        efficiency
      );

      setResults(impact);
    }
  }, [pair, additionalBribe, totalVotingPower, pairVotingPower, bribeEfficiency]);

  return (
    <div className="bg-background-secondary border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-text-primary">
        Bribe Impact Calculator
      </h2>

      {/* Pair Info */}
      <div className="mb-6 p-4 bg-background-tertiary rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-secondary">Selected Pair:</span>
          <span className="font-semibold text-text-primary">
            {pair.token0Symbol} / {pair.token1Symbol}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <span className="text-text-muted">Current TVL:</span>
            <span className="ml-2 text-text-primary font-semibold">
              ${pair.tvl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-text-muted">Current Bribes:</span>
            <span className="ml-2 text-text-primary font-semibold">
              {pair.currentBribes.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Additional Bribe Amount
          </label>
          <input
            type="number"
            value={additionalBribe}
            onChange={(e) => setAdditionalBribe(e.target.value)}
            className="w-full px-4 py-2 bg-background-tertiary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Total Voting Power
            </label>
            <input
              type="number"
              value={totalVotingPower}
              onChange={(e) => setTotalVotingPower(e.target.value)}
              className="w-full px-4 py-2 bg-background-tertiary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="1000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Pair Voting Power
            </label>
            <input
              type="number"
              value={pairVotingPower}
              onChange={(e) => setPairVotingPower(e.target.value)}
              className="w-full px-4 py-2 bg-background-tertiary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="100000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Bribe Efficiency (0-1)
            <span className="ml-2 text-text-muted text-xs">
              How effectively bribes attract liquidity
            </span>
          </label>
          <input
            type="number"
            value={bribeEfficiency}
            onChange={(e) => setBribeEfficiency(e.target.value)}
            className="w-full px-4 py-2 bg-background-tertiary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.7"
            step="0.1"
            min="0"
            max="1"
          />
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold mb-4 text-text-primary">
            Predicted Impact
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-background-tertiary rounded-lg">
              <div className="text-sm text-text-muted mb-1">Expected TVL</div>
              <div className="text-2xl font-bold text-text-primary">
                ${results.expectedTVL.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-4 bg-background-tertiary rounded-lg">
              <div className="text-sm text-text-muted mb-1">TVL Increase</div>
              <div className="text-2xl font-bold text-green-400">
                +${results.tvlIncrease.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-4 bg-background-tertiary rounded-lg">
              <div className="text-sm text-text-muted mb-1">Marginal Effect</div>
              <div className="text-2xl font-bold text-primary">
                {results.marginalEffect.toLocaleString(undefined, { maximumFractionDigits: 2 })}x
              </div>
              <div className="text-xs text-text-muted mt-1">
                TVL per unit bribe
              </div>
            </div>
            <div className="p-4 bg-background-tertiary rounded-lg">
              <div className="text-sm text-text-muted mb-1">Estimated ROI</div>
              <div className={`text-2xl font-bold ${results.roi > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(results.roi * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%
              </div>
              <div className="text-xs text-text-muted mt-1">
                Based on 0.3% fees
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

