import type React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { Colors } from "../constants/Colors"
import { useTheme } from "../context/ThemeContext"
import type { CryptoPrices } from "../types/crypto"
import { Text } from "./ui/Text"
import { formatWithCommas } from "../utils"

interface PriceListProps {
  prices: CryptoPrices | undefined
  isLoading: boolean
  error: boolean
}

const PriceList: React.FC<PriceListProps> = ({ prices, isLoading, error }) => {
  const { isDarkMode } = useTheme()

  const cardStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    shadowColor: isDarkMode ? Colors.black : Colors.grey,
  }

  if (isLoading) {
    return (
      <View style={[styles.container, cardStyle, styles.loadingContainer]}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.loadingText} variant="secondary">
          Loading prices...
        </Text>
      </View>
    )
  }

  if (error || !prices) {
    return (
      <View style={[styles.container, cardStyle, styles.errorContainer]}>
        <Text style={{ color: Colors.error }} variant="error">
          Error loading price data
        </Text>
      </View>
    )
  }

  const cryptoIds = ["bitcoin", "ethereum", "usd-coin"]
  const cryptoSymbols = ["BTC", "ETH", "USDC"]

  return (
    <View style={[styles.container, cardStyle]}>
      {cryptoIds.map((id, index) => {
        const price = prices[id]?.usd || 0
        const priceChange = prices[id]?.usd_24h_change || 0
        const isPositiveChange = priceChange >= 0

        return (
          <View key={id} style={[styles.priceRow, index < cryptoIds.length - 1 ? styles.rowBorder : null]}>
            <View style={styles.symbolContainer}>
              <Text style={styles.symbol} variant="subheading">
                {cryptoSymbols[index]}
              </Text>
              <Text style={styles.name} variant="secondary">
                {id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ")}
              </Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price} variant="body">
                ${formatWithCommas(price)}
              </Text>
              <Text style={{ color: isPositiveChange ? Colors.success : Colors.error }} variant="small">
                {isPositiveChange ? "+" : ""}
                {priceChange.toFixed(2)}%
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  symbolContainer: {
    flexDirection: "column",
  },
  symbol: {
    fontSize: 16,
    fontWeight: "600",
  },
  name: {
    fontSize: 14,
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
})

export default PriceList
