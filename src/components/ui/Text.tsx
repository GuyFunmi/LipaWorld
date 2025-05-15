
import type React from "react"
import { Text as RNText, type TextStyle } from "react-native"
import { Colors } from "../../constants/Colors"
import { useTheme } from "../../context/ThemeContext"

type TextVariant = "heading" | "subheading" | "body" | "secondary" | "small" | "error" | "sectionTitle"

interface TextProps {
  children: React.ReactNode
  variant?: TextVariant
  style?: TextStyle
}

export const Text: React.FC<TextProps> = ({ children, variant = "body", style, ...props }) => {
  const { isDarkMode } = useTheme()

  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "heading":
        return {
          fontSize: 32,
          fontWeight: "bold",
          color: isDarkMode ? Colors.white : Colors.black,
        }
      case "subheading":
        return {
          fontSize: 16,
          fontWeight: "600",
          color: isDarkMode ? Colors.white : Colors.black,
        }
      case "body":
        return {
          fontSize: 16,
          color: isDarkMode ? Colors.white : Colors.black,
        }
      case "secondary":
        return {
          fontSize: 14,
          color: isDarkMode ? Colors.lightGrey : Colors.darkGrey,
        }
      case "small":
        return {
          fontSize: 12,
          color: isDarkMode ? Colors.lightGrey : Colors.darkGrey,
        }
      case "error":
        return {
          fontSize: 16,
          fontWeight: "500",
          color: Colors.error,
        }
      case "sectionTitle":
        return {
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 12,
          color: isDarkMode ? Colors.white : Colors.black,
        }
      default:
        return {}
    }
  }

  return (
    <RNText style={[getVariantStyle(), style]} {...props}>
      {children}
    </RNText>
  )
}
