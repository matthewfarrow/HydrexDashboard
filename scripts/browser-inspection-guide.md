# Browser Inspection Guide for hydrex.fi

## Step-by-Step Instructions

### 1. Open hydrex.fi
- Go to: https://www.hydrex.fi
- Let the page fully load

### 2. Open Developer Tools
- **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
- **Firefox**: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)

### 3. Go to Network Tab
- Click on **"Network"** tab in DevTools
- You should see network requests loading

### 4. Filter for Contract Calls
In the filter box, type one of these:
- `eth_call` - RPC calls to read contract data
- `eth_` - All Ethereum RPC calls
- `rpc` - RPC requests
- `jsonrpc` - JSON-RPC requests

### 5. Interact with the Site
- Click around the site (Pools, Vote, Stake sections)
- Navigate to different pages
- This will trigger contract calls

### 6. Look for Contract Addresses
In the network requests, look for:
- **Request URLs** containing `0x...` (42 character hex strings)
- **Request Payloads** with `to:` fields containing addresses
- **Response Data** with contract addresses

### 7. Check Console Tab
- Go to **"Console"** tab
- Look for any logged contract addresses
- Sometimes contracts are logged for debugging

### 8. Common Patterns to Look For

#### Voter Contract Calls
Look for requests with:
- `function: "gauges"`
- `function: "pools"`
- `function: "bribes"`
- `function: "length"`

#### Factory Contract Calls
Look for requests with:
- `function: "getPair"`
- `function: "allPairs"`
- `function: "allPairsLength"`

#### Token Contract Calls
Look for requests with:
- `function: "balanceOf"`
- `function: "totalSupply"`
- `function: "symbol"`

### 9. Save Found Addresses
When you find an address:
1. Copy the full address (0x...)
2. Check it on Basescan: https://basescan.org/address/YOUR_ADDRESS
3. Verify it's a contract (not an EOA)
4. Check if it's verified (you'll see source code)
5. Look at the contract name/title

### 10. Verify Contract Type
Once you have an address:
1. Go to Basescan
2. Click "Contract" tab
3. Click "Read Contract"
4. Try calling common functions:
   - For Voter: `length()`, `gauges(address)`
   - For Factory: `allPairsLength()`, `getPair(address,address)`
   - For Token: `symbol()`, `totalSupply()`

## What You're Looking For

### Priority 1: Voter Contract
- **Most Important** - Needed to fetch pairs
- Look for calls to `gauges()`, `pools()`, `bribes()`
- Address will be called frequently

### Priority 2: Factory Contract
- Needed to discover all pairs
- Look for calls to `getPair()`, `allPairs()`
- May be called when loading pools page

### Priority 3: veNFT Contract
- For voting power calculations
- Look for NFT-related calls or voting escrow functions
- May be called when viewing voting/staking page

## Tips

1. **Clear network log** before starting (right-click → Clear)
2. **Refresh page** to see initial contract calls
3. **Navigate to "Pools" or "Vote"** pages - these trigger most contract calls
4. **Look for repeated addresses** - frequently called contracts are likely core contracts
5. **Check request details** - click on a request to see full payload

## Alternative: Check Page Source

1. Right-click on page → "View Page Source"
2. Search for `0x` (Ctrl+F / Cmd+F)
3. Look for 42-character hex strings (contract addresses)
4. These might be hardcoded in the frontend

## If You Can't Find Addresses

1. Check if site uses a subgraph or API instead of direct contract calls
2. Look for API endpoints in Network tab
3. Check for environment variables or config files
4. Try checking the site's GitHub repository (if public)

