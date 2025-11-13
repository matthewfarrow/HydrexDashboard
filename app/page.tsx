'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import PairSelector from '@/components/PairSelector';
import BribeCalculator from '@/components/BribeCalculator';
import TVLChart from '@/components/TVLChart';
import { fetchAllPairs, TradingPair } from '@/lib/contracts';

export default function Home() {
  const { isConnected } = useAccount();
  const [pairs, setPairs] = useState<TradingPair[]>([]);
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPairs() {
      setLoading(true);
      try {
        const fetchedPairs = await fetchAllPairs();
        setPairs(fetchedPairs);
        if (fetchedPairs.length > 0) {
          setSelectedPair(fetchedPairs[0]);
        }
      } catch (error) {
        console.error('Error loading pairs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPairs();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background-secondary">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-text-primary">Hydrex</h1>
            <span className="text-text-secondary">Bribe Calculator</span>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-text-secondary">Loading pairs...</div>
          </div>
        ) : pairs.length === 0 ? (
          <div className="bg-background-secondary border border-border rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4 text-text-primary">
              No Pairs Found
            </h2>
            <p className="text-text-secondary mb-4">
              Please configure the contract addresses in <code className="bg-background-tertiary px-2 py-1 rounded">config/contracts.ts</code>
            </p>
            <p className="text-text-muted text-sm">
              Make sure you have the correct Voter contract address and that the contracts are deployed on Base network.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Pair Selector */}
            <div className="lg:col-span-1">
              <PairSelector
                pairs={pairs}
                selectedPair={selectedPair}
                onSelectPair={setSelectedPair}
              />
            </div>

            {/* Right Column - Calculator and Charts */}
            <div className="lg:col-span-2 space-y-6">
              {selectedPair && (
                <>
                  <BribeCalculator pair={selectedPair} />
                  <TVLChart pair={selectedPair} />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background-secondary mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-text-muted text-sm">
          <p>Built for Hydrex.fi - Base's Frictionless Liquidity Hub</p>
        </div>
      </footer>
    </main>
  );
}

