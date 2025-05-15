import type { CryptoPrices } from "../types/crypto"

const API_BASE_URL = "https://api.coingecko.com/api/v3"

/**
 * Fetches current prices for Bitcoin, Ethereum, and USDC
 * @returns Promise with crypto prices data
 */
export const fetchCryptoPrices = async (): Promise<CryptoPrices> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/simple/price?ids=bitcoin,ethereum,usd-coin&vs_currencies=usd&include_24hr_change=true`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto prices")
    }

    const data = await response.json()
    return data as CryptoPrices
  } catch (error) {
    console.error("Error fetching crypto prices:", error)
    throw error
  }
}
