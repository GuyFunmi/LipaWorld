# Crypto Wallet

A simple React Native application that mimics basic functionality of a crypto wallet by integrating with the CoinGecko API.

## Features

- Display current balance for 3 cryptocurrencies (BTC, ETH, USDC)
- Show current prices for the cryptocurrencies with 24h price changes
- Display a list of recent transactions
- Pull-to-refresh functionality to update prices
- Dark mode support
- Proper error handling and loading states

## Tech Stack

- React Native with TypeScript
- Expo Router for navigation
- React Query for data fetching, caching, and state management
- CoinGecko API for cryptocurrency data
- Jest and React Testing Library for testing
- 📱 Native iOS and Android support  
- 🚀 Fast development workflow using Expo CNG

## Setup Instructions

1. Clone the repository:
\`\`\`bash
git clone https://github.com/GuyFunmi/LipaWorld.git
cd LipaWorld
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. This will create the android and ios directories if they don’t already exist:
\`\`\`bash
npx expo prebuild
\`\`\`

4. Run on a simulator or device:
   - npx expo run:ios
   - npx expo run:android

Note: This project does not use Expo Go.

Use a simulator, emulator, or a physical device with a development build (e.g., via a custom dev client).

## Project Structure

\`\`\`
src/
├── app/                # Expo Router app directory
│   ├── _layout.tsx     # Root layout for the app
│   └── index.tsx       # Home screen
├── components/         # Reusable UI components
│   ├── BalanceCard.tsx
│   ├── PriceList.tsx
│   └── TransactionList.tsx
├── constants/          # App constants
│   └── Colors.ts
├── context/            # React Context providers
│   └── ThemeContext.tsx
├── data/               # Mock data
│   └── mockData.ts
├── services/           # API services
│   └── cryptoApi.ts
└── types/              # TypeScript type definitions
    └── crypto.ts
    utils/              # TypeScript type definitions
    └── index.ts
\`\`\`

## Implementation Choices

1. **Expo Router**: Used Expo Router for file-based routing, which is the recommended navigation solution for Expo projects.

2. **API Integration**: Chose CoinGecko API because it's well-documented, reliable, and doesn't require authentication for basic usage.

3. **State Management**: Used React Query for remote state management, providing automatic caching, refetching, and loading/error states.

4. **Theme Context**: Implemented a theme context to handle dark/light mode throughout the app.

5. **Component Structure**: Created reusable components for balance display, price list, and transactions to maintain a clean separation of concerns.

6. **Mock Data**: Used mock data for wallet balances and transactions while fetching real-time price data from the API.

7. **Testing**: Implemented unit tests for all components and an integration test for the API service to ensure reliability.

## Assumptions and Shortcuts

1. **Authentication**: The app doesn't include authentication as it's outside the scope of this assessment.

2. **Transaction History**: The transaction history is mocked and doesn't reflect real blockchain transactions.

3. **Wallet Management**: The app doesn't include actual wallet creation, import, or management functionality.

4. **API Rate Limiting**: CoinGecko's free API has rate limits, so in a production app, we would need to implement proper caching and rate limit handling.

## Future Improvements

With more time, I would add:

1. **Real Wallet Integration**: Connect to actual blockchain networks to manage real crypto wallets.

2. **Transaction Functionality**: Add the ability to send and receive cryptocurrencies.

3. **Price Charts**: Implement price charts to visualize historical price data.

4. **Multiple Currencies**: Support more cryptocurrencies and fiat currency conversions.

5. **Biometric Authentication**: Add fingerprint/face ID for secure access.

6. **Push Notifications**: Implement price alerts and transaction notifications.

7. **Improved Testing**: Add more comprehensive integration and E2E tests.

8. **Performance Optimization**: Implement virtualized lists for better performance with large transaction histories.
\`\`\`