# Quick Start Guide

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

1. **Create environment file**:
   ```bash
   cp env.example .env.local
   ```

2. **Add contract addresses** to `.env.local`:
   - Get addresses from Hydrex documentation or Basescan
   - Replace all `0x0000...` placeholders

3. **Get WalletConnect Project ID**:
   - Visit https://cloud.walletconnect.com
   - Create a project
   - Copy Project ID to `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

## Running the App

```bash
# Development server
npm run dev

# Open http://localhost:3000
```

## Finding Contract Addresses

### Method 1: Hydrex Documentation
Check official docs for deployed contract addresses.

### Method 2: Base Explorer
1. Go to https://basescan.org
2. Search for "Hydrex" or known contract names
3. Look for verified contracts

### Method 3: Browser Inspection
1. Open https://www.hydrex.fi
2. Open DevTools (F12) → Network tab
3. Filter by "eth_" or contract calls
4. Find contract addresses in requests

### Method 4: Community
- Check Hydrex Discord/Telegram
- Ask in community channels

## Expected Contract Structure

Based on Aerodrome/Velodrome patterns, you should find:

- **Voter**: Manages gauges, bribes, voting
- **veNFT**: Voting escrow NFT contract
- **Factory**: Creates trading pairs
- **Gauges**: One per pair (for rewards)
- **Bribes**: One per gauge (for bribe distribution)

## Troubleshooting

### "No pairs found"
- Verify `NEXT_PUBLIC_VOTER_ADDRESS` is correct
- Check contract is deployed on Base network
- Verify RPC endpoint is working

### "Contract call failed"
- Verify contract ABIs match actual contracts
- Check contract addresses are correct
- Ensure contracts are verified on Basescan

### Wallet connection issues
- Verify WalletConnect Project ID
- Check network is set to Base
- Try different wallet provider

## Next Steps

1. Verify pairs are loading
2. Test calculator with sample bribe amounts
3. Refine calculation model with real data
4. Adjust UI to match Hydrex.fi exactly (if needed)

