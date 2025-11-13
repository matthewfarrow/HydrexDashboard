# Key Insights from Meeting Transcript

## Important Details for Finding Contracts

### 1. **Hydrex is a Fork of Aerodrome**
- Contract structure should be **very similar** to Aerodrome
- Check Aerodrome contracts on Base as reference
- Same patterns: Voter, Factory, Gauges, Bribes

### 2. **"v33 Incentive System"**
- Mentioned multiple times in transcript
- Might be in contract names (e.g., "VoterV33", "FactoryV33")
- Check for contracts with "v33" or "V33" in name

### 3. **Epoch System**
- Rewards distributed per epoch (weekly mentioned)
- Voter contract manages epoch rewards
- "100-150k in epoch emissions" mentioned

### 4. **Voting Power System**
- "43 million votes" mentioned
- "5 million voting power" mentioned
- This is the veNFT/voting escrow system

### 5. **Bribe System**
- Bribes are proportional to total bribes in epoch
- "$1 bribe = $3 emissions" ratio mentioned
- Bribes attract votes which trigger emissions

### 6. **Where They Check Data**
- **Aerodrome website** - for emissions/APR data
- **DexScreener** - for finding pools and liquidity
- **Uniswap pools** - they work with Uniswap LPs too

## Contract Discovery Strategy

### Step 1: Check Aerodrome Contracts (Reference)
Since Hydrex is a fork, find Aerodrome contracts first:
1. Go to https://basescan.org
2. Search "Aerodrome Voter" or "Aerodrome Factory"
3. Note the contract addresses
4. Look for similar patterns for Hydrex

### Step 2: Inspect hydrex.fi Website
1. Open https://www.hydrex.fi
2. Open DevTools (F12)
3. Go to **Network** tab
4. Filter by: `eth_call`, `eth_`, or `rpc`
5. Look for contract addresses in requests
6. Check **Console** tab for any logged addresses

### Step 3: Check DexScreener for Pools
1. Go to https://dexscreener.com
2. Search "HYDX" on Base network
3. Look at pool addresses
4. Check pool contract - it will show token0/token1
5. Factory address might be in pool creation transaction

### Step 4: Analyze HYDX Token Interactions
1. Go to: https://basescan.org/address/0x00000e7efa313f4e11bfff432471ed9423ac6b30
2. Check **"Token Transfers"** tab
3. Look for contracts that frequently interact (likely Voter/Factory)
4. Check **"Internal Txns"** tab
5. Look for patterns like:
   - Contracts that receive HYDX (might be rewards distributor)
   - Contracts that send HYDX (might be voter/emissions)

### Step 5: Check for "v33" Contracts
Search Basescan for:
- "Hydrex v33"
- "Hydrex V33"
- "v33 Voter"
- "v33 Factory"

## What to Look For

### Voter Contract
- Manages gauges, bribes, pools
- Handles voting and emissions distribution
- Likely has "Voter" or "VoterV33" in name
- Will have functions: `gauges()`, `bribes()`, `pools()`, `length()`

### Factory Contract
- Creates trading pairs
- Will have `createPair()` or `getPair()` functions
- Likely has "Factory" in name

### veNFT Contract
- Voting escrow NFT contract
- Locks tokens for voting power
- Might be called "VeNFT", "Ve", "VotingEscrow", or "VeV33"

### Bribe Contracts
- One per gauge/pool
- Will be found via Voter contract's `bribes(gauge)` function
- Not needed upfront - can be discovered dynamically

## Quick Test Method

Once you find a potential Voter address:
1. Go to Basescan
2. Go to "Contract" tab
3. Click "Read Contract"
4. Try calling `length()` function
5. If it returns a number, it's likely the Voter contract!

## Next Steps

1. **Inspect hydrex.fi in browser** - Most direct method
2. **Check Aerodrome contracts** - Use as reference
3. **Analyze HYDX token interactions** - Find related contracts
4. **Search Basescan** - Look for verified Hydrex contracts

