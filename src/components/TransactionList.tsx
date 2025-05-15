import { Entypo } from "@expo/vector-icons"
import type React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Colors } from "../constants/Colors"
import { useTheme } from "../context/ThemeContext"
import type { Transaction } from "../types/crypto"
import { formatWithCommas } from "../utils"
import { Text } from "./ui/Text"

interface TransactionListProps {
  transactions: Transaction[]
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const { isDarkMode } = useTheme()

  const cardStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    shadowColor: isDarkMode ? Colors.black : Colors.grey,
  }

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const isReceived = item.type === "received"

    return (
      <View style={styles.transactionItem}>
        <View
          style={[styles.iconContainer, { backgroundColor: isReceived ? Colors.successLight : Colors.primaryLight }]}
        >
          {isReceived ? (
            <Entypo size={20} name="arrow-left" color={Colors.success} />
          ) : (
            <Entypo name="arrow-right" size={20} color={Colors.success} />
          )}
        </View>

        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle} variant="subheading">
            {isReceived ? "Received" : "Sent"} {item.symbol.toUpperCase()}
          </Text>
          <Text style={styles.transactionDate} variant="secondary">
            {item.date}
          </Text>
        </View>

        <View style={styles.transactionAmount}>
          <Text style={{ color: isReceived ? Colors.success : Colors.primary }} variant="body">
            {isReceived ? "+" : "-"}
            {item.amount} {item.symbol.toUpperCase()}
          </Text>
          <Text style={styles.valueText} variant="secondary">
            ${formatWithCommas(item.valueUsd)}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, cardStyle]}>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
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
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  transactionDate: {
    fontSize: 14,
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  valueText: {
    fontSize: 14,
    marginTop: 2,
  },
})

export default TransactionList
