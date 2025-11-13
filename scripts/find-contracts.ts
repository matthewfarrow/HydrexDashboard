/**
 * Helper script to find Hydrex contract addresses
 * Run with: npx tsx scripts/find-contracts.ts
 */

import { createPublicClient, http, formatUnits } from 'viem';
import { base } from 'viem/chains';

const publicClient = createPublicClient({
  chain: base,
  transport: http('https://mainnet.base.org'),
});

// Known HYDX token address
const HYDX_TOKEN = '0x00000e7efa313f4e11bfff432471ed9423ac6b30' as const;

// Common Aerodrome/Velodrome contract name patterns
const COMMON_CONTRACT_NAMES = [
  'Voter',
  'VoterV3',
  'VoterV2',
  'Factory',
  'Router',
  'VeNFT',
  'Ve',
  'RewardsDistributor',
  'Minter',
];

async function findContracts() {
  console.log('🔍 Searching for Hydrex contracts...\n');
  console.log('Known HYDX Token:', HYDX_TOKEN);
  console.log('\nTo find other contracts:');
  console.log('1. Check https://basescan.org/address/' + HYDX_TOKEN);
  console.log('2. Look at token transfers to find related contracts');
  console.log('3. Check Hydrex documentation or GitHub');
  console.log('4. Inspect hydrex.fi network calls in browser DevTools\n');
  
  // Try to get token info
  try {
    const [symbol, name, decimals, totalSupply] = await Promise.all([
      publicClient.readContract({
        address: HYDX_TOKEN,
        abi: [
          {
            inputs: [],
            name: 'symbol',
            outputs: [{ name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: HYDX_TOKEN,
        abi: [
          {
            inputs: [],
            name: 'name',
            outputs: [{ name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'name',
      }),
      publicClient.readContract({
        address: HYDX_TOKEN,
        abi: [
          {
            inputs: [],
            name: 'decimals',
            outputs: [{ name: '', type: 'uint8' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'decimals',
      }),
      publicClient.readContract({
        address: HYDX_TOKEN,
        abi: [
          {
            inputs: [],
            name: 'totalSupply',
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'totalSupply',
      }),
    ]);

    console.log('✅ Token Info:');
    console.log(`   Name: ${name}`);
    console.log(`   Symbol: ${symbol}`);
    console.log(`   Decimals: ${decimals}`);
    console.log(`   Total Supply: ${formatUnits(totalSupply as bigint, Number(decimals))}`);
  } catch (error) {
    console.log('❌ Could not fetch token info:', error);
  }

  console.log('\n📋 Next Steps:');
  console.log('1. Visit https://basescan.org and search for "Hydrex"');
  console.log('2. Check the HYDX token contract for recent transactions');
  console.log('3. Look for contract creation events');
  console.log('4. Check Hydrex documentation: https://hydrex.gitbook.io');
  console.log('5. Join Hydrex Discord/Telegram to ask for contract addresses');
}

findContracts().catch(console.error);

