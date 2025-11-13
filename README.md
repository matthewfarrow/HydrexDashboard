# Hydrex Bribe Calculator Dashboard

A calculator tool for analyzing the impact of bribes on TVL (Total Value Locked) for trading pairs on Hydrex.fi.

## Features

- Connect to Hydrex smart contracts on Base network
- Toggle between different trading pairs
- Calculate expected bribe impact on TVL
- Predict marginal effects of additional bribes
- UI matching Hydrex.fi design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure contract addresses in `config/contracts.ts`

3. Run development server:
```bash
npm run dev
```

## Configuration Needed

To fully connect to Hydrex contracts, you'll need to provide:

1. **Smart Contract Addresses:**
   - Voter contract address
   - Gauge contract addresses for each pair
   - Bribe contract addresses
   - Token addresses (HYDX, oHYDX, etc.)

2. **Contract ABIs:**
   - Voter ABI
   - Gauge ABI
   - Bribe ABI
   - ERC20 ABI

3. **RPC Endpoint:**
   - Base network RPC URL (or use public endpoints)

These can be found in:
- Hydrex documentation
- Base blockchain explorer
- Hydrex GitHub repository (if public)

