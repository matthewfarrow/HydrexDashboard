# Finding Hydrex Contract Addresses - Action Plan

Based on the meeting transcript, here's the best approach to find the contract addresses:

## 🎯 Key Insights from Transcript

1. **Hydrex is a fork of Aerodrome** - Contract structure is identical
2. **"v33 incentive system"** - May be in contract names
3. **They check Aerodrome website** - For emissions/APR data
4. **They use DexScreener** - To find pools and liquidity
5. **Epoch-based rewards** - Weekly distribution system

## 🔍 Method 1: Inspect hydrex.fi Website (BEST METHOD)

### Quick Steps:
1. Open https://www.hydrex.fi
2. Press `F12` to open DevTools
3. Go to **Network** tab
4. Filter by: `eth_call` or `eth_`
5. Navigate to **"Pools"** or **"Vote"** pages
6. Look for contract addresses in requests (0x...)

### What to Look For:
- Requests with `function: "gauges"` → Voter contract
- Requests with `function: "getPair"` → Factory contract
- Requests with `function: "balanceOf"` on HYDX → Related contracts

**See `scripts/browser-inspection-guide.md` for detailed instructions**

## 🔍 Method 2: Check Aerodrome Contracts (Reference)

Since Hydrex is a fork, find Aerodrome contracts first:

1. Go to https://basescan.org
2. Search: **"Aerodrome Voter"** or **"Aerodrome Factory"**
3. Note the contract addresses
4. Search for similar patterns: **"Hydrex Voter"** or **"Hydrex Factory"**

## 🔍 Method 3: Analyze HYDX Token Interactions

1. Go to: https://basescan.org/address/0x00000e7efa313f4e11bfff432471ed9423ac6b30
2. Click **"Token Transfers"** tab
3. Look for contracts that frequently interact
4. Click **"Internal Txns"** tab
5. Identify patterns:
   - Contracts receiving HYDX → Rewards distributor
   - Contracts sending HYDX → Voter/emissions

## 🔍 Method 4: Search Basescan Directly

Search for:
- **"Hydrex Voter"**
- **"Hydrex Factory"**
- **"Hydrex v33"** or **"Hydrex V33"**
- **"HYDX Voter"**

Look for verified contracts with source code.

## 🔍 Method 5: Check DexScreener

1. Go to https://dexscreener.com
2. Search **"HYDX"** on Base network
3. Click on a pool
4. Check pool contract address
5. Look at pool creation transaction for Factory address

## ✅ Verification Steps

Once you find a potential contract address:

1. **Go to Basescan**: https://basescan.org/address/YOUR_ADDRESS
2. **Check if it's a contract** (not an EOA wallet)
3. **Check if it's verified** (you'll see source code)
4. **Read Contract** → Try calling functions:
   - Voter: `length()` should return number of pools
   - Factory: `allPairsLength()` should return number of pairs
   - Token: `symbol()` should return token symbol

## 📋 Contract Addresses Needed

### Critical (Must Have):
- ✅ **HYDX Token**: `0x00000e7efa313f4e11bfff432471ed9423ac6b30` (Already found!)
- ⚠️ **Voter Contract**: Most important - needed to fetch pairs
- ⚠️ **Factory Contract**: Needed to discover all pairs

### Important:
- ⚠️ **veNFT Contract**: For voting power calculations
- ⚠️ **oHYDX Token**: Options token address

### Optional:
- Router Contract
- Rewards Distributor

## 🚀 Quick Start

**Fastest way to get started:**

1. **Open hydrex.fi in browser**
2. **Open DevTools (F12)**
3. **Go to Network tab, filter by `eth_call`**
4. **Navigate to "Pools" page**
5. **Look for contract addresses in requests**
6. **Copy addresses and verify on Basescan**

## 📝 Once You Find Addresses

Add them to `.env.local`:

```env
NEXT_PUBLIC_VOTER_ADDRESS=0x...
NEXT_PUBLIC_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_VE_NFT_ADDRESS=0x...
NEXT_PUBLIC_OHYDX_ADDRESS=0x...
```

Then restart the dev server: `npm run dev`

## 💡 Pro Tips

1. **Voter contract is called most frequently** - Look for repeated addresses
2. **Factory is called when loading pools** - Navigate to pools page
3. **Check Console tab** - Sometimes addresses are logged
4. **Look for "v33" in contract names** - Based on transcript
5. **Aerodrome contracts are good reference** - Same structure

## 🆘 Still Can't Find?

1. Check Hydrex Discord/Telegram
2. Ask in community channels
3. Check Hydrex documentation/GitBook
4. Look for Hydrex GitHub repository

