import { render, screen } from "@testing-library/react-native"
import type React from "react"
import { ThemeProvider } from "../../context/ThemeContext"
import type { WalletBalance } from "../../types/crypto"
import BalanceCard from "../BalanceCard"

// Mock the useTheme hook
jest.mock("../../context/ThemeContext", () => ({
  ...jest.requireActual("../../context/ThemeContext"),
  useTheme: () => ({
    theme: "light",
    isDarkMode: false,
    toggleTheme: jest.fn(),
  }),
}))

describe("BalanceCard Component", () => {
  const mockBalances: WalletBalance[] = [
    { id: "bitcoin", symbol: "btc", amount: 0.5 },
    { id: "ethereum", symbol: "eth", amount: 2.0 },
  ]

  const mockPrices = {
    bitcoin: { usd: 30000, usd_24h_change: 2.5 },
    ethereum: { usd: 2000, usd_24h_change: -1.2 },
  }

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>)
  }

  it("renders loading state correctly", () => {
    renderWithTheme(<BalanceCard balances={mockBalances} prices={undefined} isLoading={true} error={false} />)

    expect(screen.getByText("Loading balances...")).toBeTruthy()
  })

  it("renders error state correctly", () => {
    renderWithTheme(<BalanceCard balances={mockBalances} prices={undefined} isLoading={false} error={true} />)

    expect(screen.getByText("Error loading balance data")).toBeTruthy()
  })

  it("calculates and displays total balance correctly", () => {
    renderWithTheme(<BalanceCard balances={mockBalances} prices={mockPrices} isLoading={false} error={false} />)

    // Total should be (0.5 * 30000) + (2.0 * 2000) = 15000 + 4000 = 19000
    expect(screen.getByText("$19000.00")).toBeTruthy()
    expect(screen.getByText("Total Balance")).toBeTruthy()
  })

  it("displays individual balances correctly", () => {
    renderWithTheme(<BalanceCard balances={mockBalances} prices={mockPrices} isLoading={false} error={false} />)

    // Check for BTC balance
    expect(screen.getByText("BTC")).toBeTruthy()
    expect(screen.getByText("0.5 BTC")).toBeTruthy()
    expect(screen.getByText("$15000.00")).toBeTruthy()

    // Check for ETH balance
    expect(screen.getByText("ETH")).toBeTruthy()
    expect(screen.getByText("2 ETH")).toBeTruthy()
    expect(screen.getByText("$4000.00")).toBeTruthy()
  })
})
