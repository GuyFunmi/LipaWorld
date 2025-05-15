import { fetchCryptoPrices } from "../cryptoApi"

// Mock fetch
global.fetch = jest.fn()

describe("Crypto API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should fetch crypto prices successfully", async () => {
    // Mock successful response
    const mockResponse = {
      bitcoin: {
        usd: 30000,
        usd_24h_change: 2.5,
      },
      ethereum: {
        usd: 2000,
        usd_24h_change: -1.2,
      },
      "usd-coin": {
        usd: 1,
        usd_24h_change: 0.01,
      },
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await fetchCryptoPrices()

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin&vs_currencies=usd&include_24hr_change=true",
    )

    // Check if the result matches the mock response
    expect(result).toEqual(mockResponse)
  })

  it("should throw an error when the API request fails", async () => {
    // Mock failed response
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
    })

    // Expect the function to throw an error
    await expect(fetchCryptoPrices()).rejects.toThrow("Failed to fetch crypto prices")
  })

  it("should throw an error when fetch throws", async () => {
    // Mock fetch throwing an error
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"))

    // Expect the function to throw an error
    await expect(fetchCryptoPrices()).rejects.toThrow("Network error")
  })
})
