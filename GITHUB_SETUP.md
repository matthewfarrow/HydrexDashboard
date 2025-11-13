# GitHub Setup Instructions

Your code has been committed locally. To push to GitHub:

## Option 1: Create Repository on GitHub Website

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `HydrexDashboard` (or any name you prefer)
3. **Description**: "Bribe Calculator Dashboard for Hydrex.fi"
4. **Visibility**: Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

7. **Copy the repository URL** (it will look like: `https://github.com/yourusername/HydrexDashboard.git`)

8. **Run these commands** (replace with your actual repo URL):
   ```bash
   cd /Users/mattfarrow/GitRepos/HydrexDashboard
   git remote add origin https://github.com/yourusername/HydrexDashboard.git
   git branch -M main
   git push -u origin main
   ```

## Option 2: Use GitHub CLI (if installed)

If you have GitHub CLI installed:

```bash
cd /Users/mattfarrow/GitRepos/HydrexDashboard
gh repo create HydrexDashboard --public --source=. --remote=origin --push
```

## After Pushing

Your repository will be available at:
`https://github.com/yourusername/HydrexDashboard`

## Note

The `.env.local` file is in `.gitignore` and won't be pushed (this is correct - it contains sensitive info).

Make sure to:
- Add contract addresses to `.env.local` locally
- Get WalletConnect Project ID and add to `.env.local`
- Never commit `.env.local` to GitHub

