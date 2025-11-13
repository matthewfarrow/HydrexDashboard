import { Address, createPublicClient, http, formatUnits, parseUnits } from 'viem';
import { base } from 'viem/chains';
import { CONTRACTS, RPC_URLS, BASE_CHAIN_ID } from '@/config/contracts';
import { VOTER_ABI, GAUGE_ABI, BRIBE_ABI, ERC20_ABI, PAIR_ABI } from '@/config/abis';

// Create public client for Base network
export const publicClient = createPublicClient({
  chain: base,
  transport: http(RPC_URLS[BASE_CHAIN_ID]),
});

export interface TradingPair {
  address: Address;
  token0: Address;
  token1: Address;
  token0Symbol: string;
  token1Symbol: string;
  gauge?: Address;
  bribe?: Address;
  tvl: number;
  currentBribes: number;
  emissions: number;
}

export interface BribeData {
  token: Address;
  amount: bigint;
  rate: bigint;
  symbol: string;
}

export interface GaugeData {
  totalSupply: bigint;
  token: Address;
  fees: bigint;
  rewardRate: bigint;
}

// Fetch all pairs from the voter contract
export async function fetchAllPairs(): Promise<TradingPair[]> {
  try {
    // Get number of pairs
    const length = await publicClient.readContract({
      address: CONTRACTS.VOTER as Address,
      abi: VOTER_ABI,
      functionName: 'length',
    });

    const pairs: TradingPair[] = [];
    
    // Fetch all pairs (this is a simplified version - actual implementation may vary)
    // In Aerodrome/Velodrome, pairs are stored in an array in the voter contract
    for (let i = 0; i < Number(length); i++) {
      try {
        // This would need to be adjusted based on actual contract structure
        // Some contracts use a mapping or array to store pairs
        const pairAddress = await publicClient.readContract({
          address: CONTRACTS.VOTER as Address,
          abi: VOTER_ABI,
          functionName: 'pools',
          args: [BigInt(i)],
        }) as Address;

        if (pairAddress && pairAddress !== '0x0000000000000000000000000000000000000000') {
          const pair = await fetchPairData(pairAddress);
          if (pair) pairs.push(pair);
        }
      } catch (error) {
        console.error(`Error fetching pair ${i}:`, error);
      }
    }

    return pairs;
  } catch (error) {
    console.error('Error fetching pairs:', error);
    return [];
  }
}

// Fetch data for a specific pair
export async function fetchPairData(pairAddress: Address): Promise<TradingPair | null> {
  try {
    // Get token addresses
    const [token0, token1] = await Promise.all([
      publicClient.readContract({
        address: pairAddress,
        abi: PAIR_ABI,
        functionName: 'token0',
      }) as Promise<Address>,
      publicClient.readContract({
        address: pairAddress,
        abi: PAIR_ABI,
        functionName: 'token1',
      }) as Promise<Address>,
    ]);

    // Get token symbols
    const [token0Symbol, token1Symbol] = await Promise.all([
      publicClient.readContract({
        address: token0,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }) as Promise<string>,
      publicClient.readContract({
        address: token1,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }) as Promise<string>,
    ]);

    // Get reserves for TVL calculation
    const reserves = await publicClient.readContract({
      address: pairAddress,
      abi: PAIR_ABI,
      functionName: 'getReserves',
    }) as [bigint, bigint, number];

    // Get gauge address
    const gauge = await publicClient.readContract({
      address: CONTRACTS.VOTER as Address,
      abi: VOTER_ABI,
      functionName: 'gauges',
      args: [pairAddress],
    }) as Address;

    // Get bribe address
    const bribe = gauge && gauge !== '0x0000000000000000000000000000000000000000'
      ? await publicClient.readContract({
          address: CONTRACTS.VOTER as Address,
          abi: VOTER_ABI,
          functionName: 'bribes',
          args: [gauge],
        }) as Address
      : undefined;

    // Calculate TVL (simplified - would need token prices for accurate USD value)
    const tvl = Number(formatUnits(reserves[0], 18)) + Number(formatUnits(reserves[1], 18));

    // Fetch current bribes
    let currentBribes = 0;
    if (bribe && bribe !== '0x0000000000000000000000000000000000000000') {
      // This would need to be adjusted based on actual bribe contract structure
      // Some protocols store bribes in a mapping
      try {
        const bribeRewards = await publicClient.readContract({
          address: bribe,
          abi: BRIBE_ABI,
          functionName: 'rewards',
          args: [token0], // This might need adjustment
        });
        currentBribes = Number(formatUnits(bribeRewards as bigint, 18));
      } catch (error) {
        console.error('Error fetching bribes:', error);
      }
    }

    // Fetch emissions (from gauge)
    let emissions = 0;
    if (gauge && gauge !== '0x0000000000000000000000000000000000000000') {
      try {
        const rewardRate = await publicClient.readContract({
          address: gauge,
          abi: GAUGE_ABI,
          functionName: 'rewardRate',
        });
        emissions = Number(formatUnits(rewardRate as bigint, 18));
      } catch (error) {
        console.error('Error fetching emissions:', error);
      }
    }

    return {
      address: pairAddress,
      token0,
      token1,
      token0Symbol,
      token1Symbol,
      gauge: gauge !== '0x0000000000000000000000000000000000000000' ? gauge : undefined,
      bribe: bribe && bribe !== '0x0000000000000000000000000000000000000000' ? bribe : undefined,
      tvl,
      currentBribes,
      emissions,
    };
  } catch (error) {
    console.error('Error fetching pair data:', error);
    return null;
  }
}

// Calculate expected TVL impact from bribe
export function calculateBribeImpact(
  currentTVL: number,
  currentBribes: number,
  additionalBribe: number,
  totalVotingPower: number,
  pairVotingPower: number,
  bribeEfficiency: number = 0.7 // Efficiency factor (0-1)
): {
  expectedTVL: number;
  tvlIncrease: number;
  marginalEffect: number;
  roi: number;
} {
  // Simplified model - actual calculation would be more complex
  // This assumes bribes attract liquidity proportionally to voting power
  
  const bribeRatio = additionalBribe / (currentBribes + additionalBribe || 1);
  const votingPowerRatio = pairVotingPower / (totalVotingPower || 1);
  
  // Expected TVL increase based on bribe attractiveness
  const tvlMultiplier = 1 + (bribeRatio * votingPowerRatio * bribeEfficiency);
  const expectedTVL = currentTVL * tvlMultiplier;
  const tvlIncrease = expectedTVL - currentTVL;
  
  // Marginal effect (TVL increase per unit of bribe)
  const marginalEffect = additionalBribe > 0 ? tvlIncrease / additionalBribe : 0;
  
  // ROI (simplified - would need to account for fees, time, etc.)
  const roi = additionalBribe > 0 ? (tvlIncrease * 0.003) / additionalBribe : 0; // Assuming 0.3% fee

  return {
    expectedTVL,
    tvlIncrease,
    marginalEffect,
    roi,
  };
}

