import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';
import MYCOLORS from 'Constants/MYCOLORS';
import { CustomText } from './MYTEXT';

interface ThemedTextInputProps extends TextInputProps {
  borderColor?: string;
  label: string;
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  borderColor = 'white',
  style,
  label,
  ...props
}) => {
  return (
    <View style={[styles.container, { borderColor }]}>
      <CustomText type="default" centered>
        {label}
      </CustomText>
      <TextInput style={[styles.input, style]} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
  },
  input: {
    borderColor: MYCOLORS.black,
    borderWidth: 1,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default ThemedTextInput;
