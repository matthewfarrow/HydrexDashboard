# WalletConnect Setup Guide

## What is WalletConnect Project ID?

WalletConnect is a protocol that enables secure connections between wallets and dApps. The Project ID is a unique identifier for your application that allows WalletConnect to manage these connections.

## Can I Do It For You?

**No, I cannot create a WalletConnect account for you** - this requires:
1. Creating an account on WalletConnect Cloud
2. Verifying your email
3. Creating a project
4. Getting the Project ID

This is a **free** process that takes about 2 minutes.

## Step-by-Step Instructions

### 1. Visit WalletConnect Cloud
Go to: **https://cloud.walletconnect.com**

### 2. Sign Up / Log In
- Click "Sign Up" if you don't have an account
- Use your email to create an account
- Verify your email (check your inbox)

### 3. Create a Project
- Once logged in, click "Create New Project" or "New Project"
- Enter a project name (e.g., "Hydrex Bribe Calculator")
- Select your use case (Web3 App)
- Click "Create"

### 4. Get Your Project ID
- After creating the project, you'll see a **Project ID**
- It looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
- Copy this ID

### 5. Add to Your Project
Add the Project ID to your `.env.local` file:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id-here
```

Replace `your-project-id-here` with the actual Project ID you copied.

### 6. Restart Dev Server
After adding the Project ID, restart your development server:

```bash
npm run dev
```

## Important Notes

- **Free**: WalletConnect Cloud is free to use
- **Required**: Without a Project ID, wallet connections won't work
- **Development**: You can use the same Project ID for development and production
- **Security**: The Project ID is public (it's safe to include in client-side code)

## Troubleshooting

### "Invalid Project ID"
- Make sure you copied the entire Project ID
- Check for any extra spaces
- Verify the Project ID in your WalletConnect dashboard

### Wallet Not Connecting
- Ensure Project ID is correct
- Check browser console for errors
- Make sure you're on the Base network in your wallet

## Alternative: Development Without WalletConnect

If you just want to test the calculator without wallet connections, you can:
1. Leave the Project ID as a placeholder
2. The app will still work, but the "Connect Wallet" button won't function
3. You can still view pairs and use the calculator (if contract addresses are set)

However, for full functionality, you'll need a real Project ID.

