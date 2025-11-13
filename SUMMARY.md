# Hydrex Bribe Calculator - Summary

## What Has Been Built

I've created a complete Next.js application for calculating bribe impacts on TVL for Hydrex.fi trading pairs. The application includes:

### ✅ Core Features

1. **Web3 Integration**
   - Wagmi + Viem for Base network connectivity
   - RainbowKit for wallet connections
   - Smart contract interaction layer

2. **UI Components** (Matching Hydrex.fi Design)
   - Dark theme matching Hydrex.fi aesthetic
   - Pair selector with toggle functionality
   - Bribe calculator with real-time predictions
   - TVL visualization charts

3. **Smart Contract Integration**
   - Contract ABIs based on Aerodrome/Velodrome patterns
   - Functions to fetch pairs, gauges, and bribe data
   - TVL calculation from pair reserves

4. **Bribe Calculator Logic**
   - Expected TVL prediction
   - Marginal effect calculation (TVL per unit bribe)
   - ROI estimation based on fees
   - Configurable efficiency parameters

5. **Data Visualization**
   - Interactive charts showing TVL vs Bribe relationships
   - Marginal effect analysis

## What You Need to Provide

### Critical Information Required:

1. **Smart Contract Addresses** (in `.env.local`):
   - `NEXT_PUBLIC_VOTER_ADDRESS` - Main voter contract
   - `NEXT_PUBLIC_VE_NFT_ADDRESS` - veNFT contract
   - `NEXT_PUBLIC_FACTORY_ADDRESS` - Pair factory
   - Token addresses (HYDX, oHYDX)

2. **WalletConnect Project ID**:
   - Get from https://cloud.walletconnect.com
   - Add to `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

3. **Contract ABIs Verification**:
   - Verify ABIs in `config/abis.ts` match Hydrex contracts
   - May need adjustments based on actual implementation

### How to Find Contract Addresses:

1. **Check Hydrex Documentation/GitBook**
2. **Base Blockchain Explorer** (basescan.org)
3. **Hydrex Frontend** - Inspect network calls in browser DevTools
4. **Hydrex GitHub** - If public, check deployments folder

## Project Structure

```
HydrexDashboard/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main dashboard page
│   ├── providers.tsx       # Web3 providers setup
│   └── globals.css         # Global styles (Hydrex theme)
├── components/
│   ├── PairSelector.tsx    # Pair selection component
│   ├── BribeCalculator.tsx # Main calculator component
│   └── TVLChart.tsx        # Chart visualization
├── config/
│   ├── contracts.ts        # Contract addresses config
│   └── abis.ts            # Contract ABIs
├── lib/
│   ├── web3.ts            # Wagmi/RainbowKit setup
│   └── contracts.ts       # Contract interaction functions
└── CONFIGURATION.md       # Detailed configuration guide
```

## Next Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp env.example .env.local
   # Edit .env.local with actual contract addresses
   ```

3. **Get WalletConnect Project ID**:
   - Sign up at https://cloud.walletconnect.com
   - Create a project
   - Copy Project ID to `.env.local`

4. **Verify Contract ABIs**:
   - Check if ABIs in `config/abis.ts` match Hydrex contracts
   - Update if necessary based on actual contract interfaces

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

6. **Test & Refine**:
   - Verify pairs are loading correctly
   - Test calculator with known values
   - Refine bribe calculation model based on actual data

## Key Differences from Aerodrome

Since Hydrex is a fork with oHYDX tokens:

- **oHYDX Tokens**: Options tokens instead of direct veAERO
- **Reserve-Backed Emissions**: Each HYDX requires reserve contribution
- **Permalocked veNFTs**: oHYDX can be burned for permalocked veNFTs

The calculator should work similarly, but you may need to:
- Adjust voting power calculations for oHYDX/veNFT system
- Account for reserve requirements in TVL calculations
- Consider oHYDX redemption mechanics in bribe effectiveness

## Notes

- The bribe calculation model is simplified and may need refinement based on actual Hydrex data
- Voting power calculations use placeholder values - connect to veNFT contract for real data
- TVL calculations are simplified (token prices needed for accurate USD values)
- The UI matches Hydrex.fi's dark theme aesthetic

## Support

For questions about:
- **Contract addresses**: Check Hydrex docs, Basescan, or community
- **ABI verification**: Compare with verified contracts on Basescan
- **Calculation accuracy**: Test with historical data and refine model

