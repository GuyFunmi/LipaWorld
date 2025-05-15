// API response types
export interface CryptoPriceData {
  usd: number
  usd_24h_change: number
}

export interface CryptoPrices {
  [id: string]: CryptoPriceData
}

// Wallet data types
export interface WalletBalance {
  id: string
  symbol: string
  amount: number
}

export interface Transaction {
  id: string
  type: "sent" | "received"
  symbol: string
  amount: number
  valueUsd: number
  date: string
}

export interface WalletData {
  balances: WalletBalance[]
  transactions: Transaction[]
}
