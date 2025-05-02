# Solana Coin Flip Game 🎲

A decentralized coin flip gambling game built on Solana blockchain with Next.js and React.

## Features ✨

- **Simple Gameplay**: Easy-to-understand coin flip mechanics
- **Fair Odds**: 35% win rate with transparent house edge
- **Solana Integration**: Direct wallet connection and transactions
- **Realistic Animation**: Smooth 3D coin flip animation
- **Modern UI**: Clean, responsive interface with glassmorphism effects

## Try It Out 🚀

Play now at [demo-url] (development version)

## Deployment 🌐

### Quick Deploy
The fastest way to deploy your own instance:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fsolana-coin-flip)

### Manual Deployment Steps

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/solana-coin-flip.git
   cd solana-coin-flip
   ```

2. **Install Dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the `app` directory:
   ```env
   NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_NETWORK=devnet
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```
   Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

Required variables for deployment:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_RPC_URL` | Solana RPC URL | https://api.devnet.solana.com |
| `NEXT_PUBLIC_NETWORK` | Solana network | devnet |
| `NEXT_PUBLIC_MIN_BET` | Minimum bet amount | 1 |
| `NEXT_PUBLIC_MAX_BET` | Maximum bet amount | 3 |
| `NEXT_PUBLIC_WIN_RATE` | Win probability | 35 |

## Development 💻

### Prerequisites
- Node.js 18+
- npm or yarn
- Solana CLI tools
- Phantom Wallet or similar Solana wallet

### Local Setup
```bash
# Install dependencies
cd app
npm install

# Start development server
npm run dev
```

### Build
```bash
# Production build
npm run build

# Start production server
npm start
```

## Game Economics 💰

- **Minimum Bet**: 1 SOL
- **Maximum Bet**: 3 SOL
- **Win Rate**: 35%
- **Payout**: 2x bet amount on win
- **House Edge**: 65%

## Security 🔒

- Client-side wallet integration
- Server-side transaction verification
- Rate limiting implementation
- Error handling and validation

## Recent Updates 🆕

### v0.2.0
- Simplified coin flip animation
- Reduced win rate to 35%
- Enhanced visual effects
- Improved performance
- Fixed animation glitches

### v0.1.0
- Initial release
- Basic game mechanics
- Wallet integration
- Test SOL support

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap 🗺️

- [ ] User statistics tracking
- [ ] Leaderboard implementation
- [ ] Achievement system
- [ ] Social sharing features
- [ ] Mobile app version

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 🤝

For support, join our [Discord community](your-discord-link) or open an issue.

## Acknowledgments 🙏

- Solana Foundation
- Next.js team
- React community
- Contributors
