'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TradingPair, calculateBribeImpact } from '@/lib/contracts';

interface TVLChartProps {
  pair: TradingPair;
}

export default function TVLChart({ pair }: TVLChartProps) {
  const [chartData, setChartData] = useState<Array<{ bribe: number; tvl: number; marginal: number }>>([]);

  useEffect(() => {
    // Generate data points for different bribe amounts
    const data: Array<{ bribe: number; tvl: number; marginal: number }> = [];
    const maxBribe = Math.max(pair.currentBribes * 5, 10000);
    const steps = 20;

    for (let i = 0; i <= steps; i++) {
      const bribeAmount = (i / steps) * maxBribe;
      const impact = calculateBribeImpact(
        pair.tvl,
        pair.currentBribes,
        bribeAmount,
        1000000, // Default total voting power
        100000,  // Default pair voting power
        0.7      // Default efficiency
      );

      data.push({
        bribe: bribeAmount,
        tvl: impact.expectedTVL,
        marginal: impact.marginalEffect,
      });
    }

    setChartData(data);
  }, [pair]);

  return (
    <div className="bg-background-secondary border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-text-primary">
        TVL vs Bribe Analysis
      </h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="bribe" 
              stroke="#9CA3AF"
              tickFormatter={(value) => value.toLocaleString()}
              label={{ value: 'Bribe Amount', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              label={{ value: 'Expected TVL', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#FFFFFF',
              }}
              formatter={(value: number) => [
                `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                'Expected TVL'
              ]}
              labelFormatter={(label) => `Bribe: ${Number(label).toLocaleString()}`}
            />
            <Legend 
              wrapperStyle={{ color: '#9CA3AF' }}
            />
            <Line 
              type="monotone" 
              dataKey="tvl" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Expected TVL"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-background-tertiary rounded-lg">
        <h3 className="text-sm font-semibold mb-2 text-text-primary">
          Marginal Effect Analysis
        </h3>
        <p className="text-sm text-text-secondary">
          This chart shows how expected TVL changes as bribe amounts increase. 
          The slope indicates the marginal effect - steeper slopes mean more efficient bribes.
        </p>
      </div>
    </div>
  );
}

