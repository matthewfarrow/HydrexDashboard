# Configuration Guide

This document outlines what information you need to provide to make the Hydrex Bribe Calculator fully functional.

## Required Information

### 1. Smart Contract Addresses

You need to provide the following contract addresses on Base network:

#### Core Contracts
- **Voter Contract**: The main contract that manages gauges, bribes, and voting
- **veNFT Contract**: The contract for veNFT (voting escrow NFTs) - similar to veAERO in Aerodrome
- **Rewards Distributor**: Contract that distributes rewards/emissions

#### Token Contracts
- **HYDX Token**: The main HYDX token address
- **oHYDX Token**: The oHYDX options token address

#### DEX Contracts
- **Factory Contract**: The pair factory contract (for discovering pairs)
- **Router Contract**: The router contract (optional, for additional functionality)

### 2. Contract ABIs

The ABIs in `config/abis.ts` are based on standard Aerodrome/Velodrome patterns. You may need to verify or update them based on Hydrex's actual implementation:

- **Voter ABI**: Methods for fetching gauges, bribes, and pools
- **Gauge ABI**: Methods for reading gauge data (TVL, rewards, etc.)
- **Bribe ABI**: Methods for reading bribe data
- **ERC20 ABI**: Standard token interface
- **Pair ABI**: Standard Uniswap V2-style pair interface

### 3. How to Find Contract Addresses

#### Option 1: Hydrex Documentation
Check Hydrex's official documentation or GitBook for contract addresses.

#### Option 2: Base Blockchain Explorer
1. Go to [Basescan.org](https://basescan.org)
2. Search for known Hydrex contracts or transactions
3. Look for contract creation transactions

#### Option 3: Hydrex GitHub
If Hydrex has a public GitHub repository, check for:
- `deployments/` folder
- `addresses.json` or similar configuration files
- Documentation files

#### Option 4: Hydrex Frontend
1. Open Hydrex.fi in your browser
2. Open browser DevTools (F12)
3. Check Network tab for contract calls
4. Look for contract addresses in API responses or Web3 calls

### 4. Configuration Steps

1. **Copy `.env.example` to `.env.local`**:
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in contract addresses** in `.env.local`

3. **Get WalletConnect Project ID**:
   - Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Create a project
   - Copy the Project ID to `.env.local`

4. **Verify ABIs** in `config/abis.ts` match Hydrex's contracts:
   - You can verify by calling contract methods
   - Or check contract source code if verified on Basescan

5. **Test the connection**:
   - Run `npm run dev`
   - Check browser console for any contract errors
   - Verify pairs are loading correctly

### 5. Additional Configuration

#### RPC Endpoint
- Default: Uses public Base RPC (`https://mainnet.base.org`)
- For better performance, consider using:
  - Alchemy Base endpoint
  - Infura Base endpoint
  - QuickNode Base endpoint

#### Voting Power Calculation
The calculator uses simplified voting power calculations. You may need to:
- Connect to veNFT contract to fetch actual voting power
- Calculate voting power based on lock duration and amount
- Fetch total voting power from voter contract

### 6. Bribe Calculation Model

The current bribe impact calculation is a simplified model. You may want to refine it based on:

- Historical data on bribe effectiveness
- Actual voting patterns on Hydrex
- Market conditions and liquidity depth
- Token-specific factors

### 7. Testing

After configuration:
1. Verify pairs are loading
2. Check that pair data (TVL, bribes) is accurate
3. Test calculator with known bribe amounts
4. Compare predictions with actual outcomes (if historical data available)

## Support

If you need help finding contract addresses or have questions about the configuration, check:
- Hydrex Discord/Telegram
- Hydrex documentation
- Base network explorer
- Contract verification on Basescan

