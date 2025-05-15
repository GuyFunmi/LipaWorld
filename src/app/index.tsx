import { useQuery } from "@tanstack/react-query"
import React from "react"
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import BalanceCard from "../components/BalanceCard"
import PriceList from "../components/PriceList"
import TransactionList from "../components/TransactionList"
import { Text } from "../components/ui/Text"
import { mockWalletData } from "../data/mockData"
import { fetchCryptoPrices } from "../services/cryptoApi"

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false)

  const {
    data: pricesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
  })

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.balanceSection}>
        <Text variant="sectionTitle">Your Balance</Text>
        <BalanceCard
          balances={mockWalletData.balances}
          prices={pricesData}
          isLoading={isLoading}
          error={error ? true : false}
        />
      </View>

      <View style={styles.pricesSection}>
        <Text variant="sectionTitle">Current Prices</Text>
        <PriceList prices={pricesData} isLoading={isLoading} error={error ? true : false} />
      </View>

      <View style={styles.transactionsSection}>
        <Text variant="sectionTitle">Recent Transactions</Text>
        <TransactionList transactions={mockWalletData.transactions} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  balanceSection: {
    marginBottom: 24,
  },
  pricesSection: {
    marginBottom: 24,
  },
  transactionsSection: {
    marginBottom: 24,
  },
})
