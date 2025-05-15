import type { WalletData } from "../types/crypto"

export const mockWalletData: WalletData = {
  balances: [
    {
      id: "bitcoin",
      symbol: "btc",
      amount: 0.5,
    },
    {
      id: "ethereum",
      symbol: "eth",
      amount: 2.75,
    },
    {
      id: "usd-coin",
      symbol: "usdc",
      amount: 500,
    },
  ],
  transactions: [
    {
      id: "1",
      type: "received",
      symbol: "btc",
      amount: 0.25,
      valueUsd: 7500,
      date: "May 10, 2025",
    },
    {
      id: "2",
      type: "sent",
      symbol: "eth",
      amount: 1.5,
      valueUsd: 3000,
      date: "May 8, 2025",
    },
    {
      id: "3",
      type: "received",
      symbol: "usdc",
      amount: 250,
      valueUsd: 250,
      date: "May 5, 2025",
    },
    {
      id: "4",
      type: "sent",
      symbol: "btc",
      amount: 0.1,
      valueUsd: 3000,
      date: "May 1, 2025",
    },
    {
      id: "5",
      type: "received",
      symbol: "eth",
      amount: 0.75,
      valueUsd: 1500,
      date: "Apr 28, 2025",
    },
  ],
}
