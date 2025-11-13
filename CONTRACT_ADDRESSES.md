# Hydrex Contract Addresses

## ✅ Found Addresses

### HYDX Token
- **Address**: `0x00000e7efa313f4e11bfff432471ed9423ac6b30`
- **Network**: Base (Chain ID: 8453)
- **Explorer**: https://basescan.org/address/0x00000e7efa313f4e11bfff432471ed9423ac6b30

## 🔍 Still Need to Find

The following contract addresses need to be found. Here are methods to find them:

### 1. Voter Contract (CRITICAL - Most Important)
The voter contract manages gauges, bribes, and voting. This is essential for the calculator.

**How to find:**
- Check Hydrex documentation/GitBook
- Look at HYDX token transfers on Basescan - voter contract likely interacts with it
- Inspect hydrex.fi in browser DevTools → Network tab → filter for contract calls
- Check if Hydrex has a GitHub repo with deployments folder
- Ask in Hydrex Discord/Telegram

**What to look for:**
- Contract that has `gauges()`, `bribes()`, `pools()` functions
- Contract that receives votes or manages emissions

### 2. Factory Contract
Creates trading pairs. Needed to discover all pairs.

**How to find:**
- Similar methods as Voter
- Look for contract that creates pairs (check pair creation events)
- Factory typically has `createPair()` or `getPair()` functions

### 3. veNFT Contract
Voting escrow NFT contract (similar to veAERO in Aerodrome).

**How to find:**
- Check for NFT contract related to voting
- Look for contract that locks tokens for voting power
- May be called "VeNFT", "Ve", or "VotingEscrow"

### 4. oHYDX Token
Options token address.

**How to find:**
- Check token transfers from HYDX contract
- Look in Hydrex documentation
- May be mentioned in tokenomics docs

### 5. Router Contract (Optional)
Router for swaps. Not critical for bribe calculator but useful.

### 6. Rewards Distributor (Optional)
Distributes rewards/emissions. May not be needed if handled by voter.

## Quick Search Methods

### Method 1: Basescan Search
1. Go to https://basescan.org
2. Search for "Hydrex" or "HYDX"
3. Look for verified contracts
4. Check contract interactions

### Method 2: Browser Inspection
1. Open https://www.hydrex.fi
2. Open DevTools (F12)
3. Go to Network tab
4. Filter by "eth_" or "eth_call"
5. Look for contract addresses in requests
6. Check Console for any contract addresses logged

### Method 3: Token Contract Analysis
1. Go to HYDX token on Basescan: https://basescan.org/address/0x00000e7efa313f4e11bfff432471ed9423ac6b30
2. Check "Token Transfers" tab
3. Look for contracts that frequently interact
4. Check "Contract" tab for any hardcoded addresses

### Method 4: Community
- Hydrex Discord
- Hydrex Telegram
- Hydrex Twitter/X
- Ask developers directly

## Once You Have Addresses

Add them to `.env.local`:

```env
NEXT_PUBLIC_VOTER_ADDRESS=0x...
NEXT_PUBLIC_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_VE_NFT_ADDRESS=0x...
NEXT_PUBLIC_OHYDX_ADDRESS=0x...
```

Then restart the dev server.

