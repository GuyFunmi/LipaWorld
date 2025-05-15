import type React from "react"
import { useMemo } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { Colors } from "../constants/Colors"
import { useTheme } from "../context/ThemeContext"
import type { CryptoPrices, WalletBalance } from "../types/crypto"
import { formatWithCommas } from "../utils"
import { Text } from "./ui/Text"

interface BalanceCardProps {
  balances: WalletBalance[]
  prices: CryptoPrices | undefined
  isLoading: boolean
  error: boolean
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balances, prices, isLoading, error }) => {
  const { isDarkMode } = useTheme()

  const totalBalanceUSD = useMemo(() => {
    if (!prices) return 0

    return balances.reduce((total, balance) => {
      const price = prices[balance.id]?.usd || 0
      return total + balance.amount * price
    }, 0)
  }, [balances, prices])

  const cardStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    shadowColor: isDarkMode ? Colors.black : Colors.grey,
  }

  if (isLoading) {
    return (
      <View style={[styles.card, cardStyle, styles.loadingCard]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText} variant="secondary">
          Loading balances...
        </Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.card, cardStyle, styles.errorCard]}>
        <Text style={{ color: Colors.error }} variant="error">
          Error loading balance data
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.card, cardStyle]}>
      <Text style={styles.totalBalance} variant="heading">
        ${formatWithCommas(totalBalanceUSD)}
      </Text>
      <Text style={styles.totalLabel} variant="secondary">
        Total Balance
      </Text>

      <View style={styles.divider} />

      {balances.map((balance) => {
        const price = prices?.[balance.id]?.usd || 0
        const valueUsd = balance.amount * price

        return (
          <View key={balance.id} style={styles.currencyRow}>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencySymbol} variant="subheading">
                {balance.symbol.toUpperCase()}
              </Text>
              <Text style={styles.currencyAmount} variant="secondary">
                {balance.amount} {balance.symbol.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.currencyValue} variant="body">
              ${formatWithCommas(valueUsd)}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  totalBalance: {
    fontSize: 32,
    fontWeight: "bold",
  },
  totalLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginVertical: 16,
  },
  currencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  currencyInfo: {
    flexDirection: "column",
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "600",
  },
  currencyAmount: {
    fontSize: 14,
    marginTop: 2,
  },
  currencyValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  loadingCard: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  errorCard: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },
})

export default BalanceCard
