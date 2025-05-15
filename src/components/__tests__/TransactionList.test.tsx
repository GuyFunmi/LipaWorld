import { render, screen } from "@testing-library/react-native"
import TransactionList from "../TransactionList"
import type { Transaction } from "../../types/crypto"

describe("TransactionList Component", () => {
  const mockTransactions: Transaction[] = [
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
  ]

  it("renders transactions correctly", () => {
    render(<TransactionList transactions={mockTransactions} />)

    expect(screen.getByText("Received BTC")).toBeTruthy()
    expect(screen.getByText("May 10, 2025")).toBeTruthy()
    expect(screen.getByText("+0.25 BTC")).toBeTruthy()
    expect(screen.getByText("$7500.00")).toBeTruthy()

    expect(screen.getByText("Sent ETH")).toBeTruthy()
    expect(screen.getByText("May 8, 2025")).toBeTruthy()
    expect(screen.getByText("-1.5 ETH")).toBeTruthy()
    expect(screen.getByText("$3000.00")).toBeTruthy()
  })

  it("renders empty list when no transactions", () => {
    render(<TransactionList transactions={[]} />)

    const flatList = screen.UNSAFE_getByType("RCTScrollView")
    expect(flatList.props.data.length).toBe(0)
  })
})
