import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import MYCOLORS from './MYCOLORS';

interface ThemedButtonProps {
  title: string; // Button label
  onPress: () => void; // Function triggered on press
  style?: ViewStyle; // Custom styles for overriding defaults
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && { backgroundColor: MYCOLORS.black }, // Darker color when pressed
      ]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: MYCOLORS.background,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, // Rounded corners
    shadowColor: MYCOLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Shadow effect for Android
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: MYCOLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThemedButton;
