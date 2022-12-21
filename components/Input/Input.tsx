import React from 'react';

import { StyleSheet, TextInput, TextStyle, ViewStyle } from 'react-native';

import Colors from '../../constants/Colors';

const Input: React.FC<{
  placeholder: string;
  autoCorrect?: boolean;
  cursorColor?: keyof typeof Colors;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  multiline?: boolean;
  setText: React.Dispatch<React.SetStateAction<string>>;
  style?: TextStyle | ViewStyle;
}> = ({
  placeholder,
  autoCorrect,
  cursorColor,
  keyboardType,
  multiline,
  setText,
  style,
}) => {
  const styles = StyleSheet.create({
    input: {},
    customStyle: {
      ...style,
    },
  });

  const inputStyles = StyleSheet.compose(styles.input, styles.customStyle);
  return (
    <TextInput
      style={inputStyles}
      placeholder={placeholder}
      autoCorrect={autoCorrect}
      cursorColor={cursorColor}
      keyboardType={keyboardType}
      multiline={multiline}
      onChange={event => setText(event.nativeEvent.text)}
    />
  );
};

export default Input;
