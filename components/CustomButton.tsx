import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React from 'react'

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, style, textStyle, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        style,
        isLoading ? { opacity: 0.5 } : {},
      ]}
      disabled={isLoading}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton