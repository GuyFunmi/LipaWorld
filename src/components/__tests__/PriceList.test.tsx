import { render, screen } from "@testing-library/react-native"
import PriceList from "../PriceList"

describe("PriceList Component", () => {
  const mockPrices = {
    bitcoin: { usd: 30000, usd_24h_change: 2.5 },
    ethereum: { usd: 2000, usd_24h_change: -1.2 },
    "usd-coin": { usd: 1, usd_24h_change: 0.01 },
  }

  it("renders loading state correctly", () => {
    render(<PriceList prices={undefined} isLoading={true} error={false} />)

    expect(screen.getByText("Loading prices...")).toBeTruthy()
  })

  it("renders error state correctly", () => {
    render(<PriceList prices={undefined} isLoading={false} error={true} />)

    expect(screen.getByText("Error loading price data")).toBeTruthy()
  })

  it("displays crypto prices correctly", () => {
    render(<PriceList prices={mockPrices} isLoading={false} error={false} />)

    expect(screen.getByText("BTC")).toBeTruthy()
    expect(screen.getByText("Bitcoin")).toBeTruthy()
    expect(screen.getByText("$30000.00")).toBeTruthy()
    expect(screen.getByText("+2.50%")).toBeTruthy()

    expect(screen.getByText("ETH")).toBeTruthy()
    expect(screen.getByText("Ethereum")).toBeTruthy()
    expect(screen.getByText("$2000.00")).toBeTruthy()
    expect(screen.getByText("-1.20%")).toBeTruthy()

    expect(screen.getByText("USDC")).toBeTruthy()
    expect(screen.getByText("Usd coin")).toBeTruthy()
    expect(screen.getByText("$1.00")).toBeTruthy()
    expect(screen.getByText("+0.01%")).toBeTruthy()
  })
})
