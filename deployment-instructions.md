# Vercel Deployment Settings

## Basic Configuration
- Project Name: `coin-flip-solana-app`
- Framework Preset: Next.js
- Build Command: Leave as default
- Output Directory: Leave as default
- Install Command: Leave as default

## Project Settings
In the Vercel project settings:
1. Select the repository `coin-flip-solana`
2. Choose framework preset: `Next.js`
3. Set Root Directory: `app`

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

## Deployment Process
1. Click "Deploy"
2. Wait for the build process to complete
3. Verify the deployment logs
4. Check the deployed URL

## Post-Deployment Verification
1. Test wallet connection
2. Verify coin animations work
3. Check bet functionality
4. Test devnet SOL transactions
5. Verify environment variables are loaded correctly

## Common Issues & Solutions
1. If build fails:
   - Verify Root Directory is set to "app"
   - Check all environment variables are set
   - Review build logs for specific errors

2. If app deploys but doesn't work:
   - Check browser console for errors
   - Verify Solana connection
   - Test wallet connectivity
   - Confirm environment variables are accessible

3. If coin animations don't work:
   - Clear browser cache
   - Check for CSS/JS errors in console
   - Verify browser compatibility

## Monitoring
- Watch deployment logs for any errors
- Monitor app performance after deployment
- Check Vercel analytics for any issues
- Verify all routes are working correctly

## Support
If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Verify environment configurations
4. Test on multiple browsers
5. Check network connectivity to Solana devnet
