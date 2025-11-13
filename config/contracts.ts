// Hydrex Smart Contract Addresses on Base Network
// TODO: Replace with actual contract addresses from Hydrex.fi

export const BASE_CHAIN_ID = 8453;

// Contract addresses - these need to be provided by the user or found in Hydrex docs
export const CONTRACTS = {
  // Main contracts (similar to Aerodrome structure)
  VOTER: process.env.NEXT_PUBLIC_VOTER_ADDRESS || '0x0000000000000000000000000000000000000000',
  VE_NFT: process.env.NEXT_PUBLIC_VE_NFT_ADDRESS || '0x0000000000000000000000000000000000000000',
  REWARDS_DISTRIBUTOR: process.env.NEXT_PUBLIC_REWARDS_DISTRIBUTOR_ADDRESS || '0x0000000000000000000000000000000000000000',
  
  // Token addresses
  HYDX: process.env.NEXT_PUBLIC_HYDX_ADDRESS || '0x00000e7efa313f4e11bfff432471ed9423ac6b30', // ✅ Found: HYDX token on Base
  OHYDX: process.env.NEXT_PUBLIC_OHYDX_ADDRESS || '0x0000000000000000000000000000000000000000',
  
  // Factory and Router (for pair discovery)
  FACTORY: process.env.NEXT_PUBLIC_FACTORY_ADDRESS || '0x0000000000000000000000000000000000000000',
  ROUTER: process.env.NEXT_PUBLIC_ROUTER_ADDRESS || '0x0000000000000000000000000000000000000000',
} as const;

// RPC Configuration
export const RPC_URLS = {
  [BASE_CHAIN_ID]: process.env.NEXT_PUBLIC_RPC_URL || 'https://mainnet.base.org',
};

// Common token addresses on Base (for reference)
export const BASE_TOKENS = {
  WETH: '0x4200000000000000000000000000000000000006',
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  DAI: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
} as const;

