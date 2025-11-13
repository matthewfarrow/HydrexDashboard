/**
 * Instructions for finding Hydrex contract addresses by inspecting hydrex.fi
 * 
 * Based on the transcript, Hydrex is a fork of Aerodrome with similar structure.
 * 
 * Method 1: Browser DevTools Network Inspection
 * 1. Open https://www.hydrex.fi in Chrome/Firefox
 * 2. Open DevTools (F12 or Cmd+Option+I)
 * 3. Go to Network tab
 * 4. Filter by: "eth_" or "eth_call" or "rpc"
 * 5. Look for contract addresses in requests (they'll be 0x...)
 * 6. Common patterns to look for:
 *    - Voter contract calls (gauges, pools, bribes functions)
 *    - Factory contract calls (getPair, allPairs functions)
 *    - Token contract calls (balanceOf, totalSupply)
 * 
 * Method 2: Check Aerodrome Contracts (Similar Structure)
 * Since Hydrex is a fork, check Aerodrome's contracts on Base:
 * - Aerodrome Voter: Check basescan.org for "Aerodrome Voter"
 * - Aerodrome Factory: Check basescan.org for "Aerodrome Factory"
 * - Then search for similar patterns for Hydrex
 * 
 * Method 3: Check DexScreener
 * 1. Go to dexscreener.com
 * 2. Search for HYDX token
 * 3. Look at pool addresses
 * 4. Check pool contract - it will have token0/token1
 * 5. Factory address might be in pool creation transaction
 * 
 * Method 4: Check HYDX Token Contract
 * 1. Go to: https://basescan.org/address/0x00000e7efa313f4e11bfff432471ed9423ac6b30
 * 2. Check "Token Transfers" tab
 * 3. Look for contracts that frequently interact
 * 4. Check "Contract" tab for any hardcoded addresses
 * 5. Check "Internal Txns" for contract interactions
 * 
 * Method 5: Check Recent Transactions
 * 1. Look for transactions that create pairs
 * 2. Look for transactions that vote or bribe
 * 3. These will show voter/factory addresses
 * 
 * Key Terms from Transcript:
 * - "v33 incentive system" - might be in contract names
 * - "epoch rewards" - voter contract manages this
 * - "voting power" - veNFT contract
 * - "bribes" - bribe contracts (one per gauge)
 * - "emissions" - rewards distributor or voter
 */

console.log(`
🔍 Hydrex Contract Discovery Guide

Based on the transcript, here's what we know:
- Hydrex is a fork of Aerodrome Finance
- Uses similar contract structure (Voter, Factory, Gauges, Bribes)
- Has v33 incentive system
- Uses epochs for rewards distribution
- Voting power system (43M votes mentioned)

Next Steps:
1. Inspect hydrex.fi in browser DevTools
2. Check Aerodrome contracts on Base for reference
3. Look at HYDX token interactions on Basescan
4. Check DexScreener for pool addresses
`);

