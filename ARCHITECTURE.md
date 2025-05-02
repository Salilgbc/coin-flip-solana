# Solana Coin Flip Game Architecture

This document outlines the technical architecture for the Solana-based coin flip game.

## 1. Tech Stack

- **Blockchain:** Solana Mainnet (or Devnet/Testnet for development)
- **Smart Contracts:** Rust + Anchor Framework
- **Frontend:** Next.js (React) + TypeScript
- **Wallet Integration:** @solana/wallet-adapter (with specific support for Phantom Wallet)
- **Blockchain Interaction:** @solana/web3.js
- **Randomness:** Pyth Network Oracle
- **Testing:** Solana-test-validator + Mocha/Chai

## 2. Core Components

### Program (Rust)

- **Game Account Structure:** Defines the state of each coin flip game instance, including bet amount, user choice (heads/tails), outcome, winner, and status.
- **Bet Processing Handler:** Manages the logic for users placing bets, transferring SOL to the program's escrow account, and updating the game state.
- **Pyth Oracle Integration:** Interacts with the Pyth Network oracle to fetch a verifiable random number (VRF) or price feed that can be used to determine the flip outcome.
- **Prize Distribution Logic:** Handles the transfer of SOL from the program's escrow account to the winner based on the game outcome.

### Client (TypeScript)

- **Wallet Connection:** Utilizes `@solana/wallet-adapter` to connect to various Solana wallets, with enhanced features for Phantom Wallet (auto-connect, optimized signing).
- **Bet Interface:** Provides a user interface for selecting heads or tails, entering a bet amount, and initiating the coin flip transaction.
- **Transaction Management:** Uses `@solana/web3.js` to construct, sign, and send transactions to the Solana network. Includes handling for transaction confirmation and error states.
- **Game History Tracking:** (Optional) Could involve fetching past game data from the blockchain or using a separate backend service to display a history of flips.

## 3. Development Phases

1.  **Local Environment Setup:** Install necessary tools (Rust, Solana CLI, Anchor, Node.js, Yarn/npm). Set up a local Solana validator.
2.  **Web3.js & Wallet Configuration:** Configure the frontend to connect to the Solana network using Web3.js and integrate the wallet adapter with Phantom-specific features.
3.  **Smart Contract Development:** Write the Anchor program in Rust, defining the game logic, account structures, and oracle integration.
4.  **Enhanced Frontend Integration:** Build the React/Next.js frontend, connecting the UI to the smart contract via Web3.js and the wallet adapter. Implement transaction handling and state management.
5.  **Testing & Deployment:** Write unit tests for the smart contract. Test the full application flow on a local validator and then on a public testnet/devnet. Prepare for deployment to Solana Mainnet.

## 4. Critical Considerations

- **Secure Randomness:** Ensuring the coin flip outcome is genuinely random and cannot be manipulated. Pyth Network's VRF is a strong candidate for this.
- **SOL Token Handling:** Securely managing SOL transfers to and from the program's escrow account.
- **Transaction Fees:** Accurately calculating and handling transaction fees (compute units, priority fees).
- **Error Handling:** Implementing robust error handling for failed transactions, oracle issues, and other potential problems.
- **Frontend State Management:** Effectively managing the state of the game and wallet connection in the frontend application.
- **Phantom Wallet Specifics:** Implementing features like auto-connect, optimized signing, and deep linking for a better user experience with Phantom.