import React from 'react';

import { StyleSheet, TextInput } from 'react-native';

import Colors from '../../constants/Colors';

const Input: React.FC<{
  placeholder: string;
  autoCorrect?: boolean;
  cursorColor?: keyof typeof Colors.light;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  multiline?: boolean;
}> = ({ placeholder, autoCorrect, cursorColor, keyboardType, multiline }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCorrect={autoCorrect}
    cursorColor={cursorColor}
    keyboardType={keyboardType}
    multiline={multiline}
  />
);

export default Input;

const styles = StyleSheet.create({
  input: {},
});
