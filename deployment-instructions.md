# Vercel Deployment Settings

## Basic Configuration
- Project Name: `coin-flip-solana-app`
- Framework Preset: Next.js
- Root Directory: `app`
- Build Command: `npm run build`
- Output Directory: (Next.js default)
- Install Command: `npm install`

## Required Environment Variables
Add these in the Vercel deployment settings:

```env
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_NETWORK=devnet
NODE_ENV=production
NEXT_PUBLIC_MIN_BET=1
NEXT_PUBLIC_MAX_BET=3
NEXT_PUBLIC_WIN_RATE=35
```

## Deployment Steps
1. Click "Deploy"
2. Wait for build to complete
3. Verify deployment logs for any issues
4. Once deployed, verify environment variables are working by:
   - Checking wallet connection
   - Testing coin flip functionality
   - Verifying SOL transactions

## Post-Deployment Checks
1. Test wallet connection
2. Verify coin animations
3. Check bet functionality
4. Ensure proper routing
5. Verify environment variables are loaded

## Troubleshooting
If deployment fails:
1. Check build logs for errors
2. Verify all environment variables are set
3. Ensure root directory is set to "app"
4. Confirm Next.js configuration is correct
5. Verify package.json dependencies are installed
