import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "react-native"
import { Colors } from "../constants/Colors"
import { ThemeProvider } from "../context/ThemeContext"

const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
            headerTintColor: isDarkMode ? Colors.white : Colors.black,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            contentStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Crypto Wallet",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
