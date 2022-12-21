import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

const RadioButton: React.FC<{
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ checked, setChecked }) => (
  <Pressable style={styles.container} onPress={() => setChecked(!checked)}>
    <View style={[styles.outerCircle, checked && styles.active]}>
      <View style={[styles.innerCircle, checked && styles.innerActive]} />
    </View>
  </Pressable>
);

export default RadioButton;

const styles = StyleSheet.create({
  container: {},
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#bcbcbc',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  active: {
    borderColor: '#999999',
  },
  innerActive: {
    backgroundColor: '#999999',
    borderRadius: 10,
  },
});
