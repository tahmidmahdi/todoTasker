import React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import Colors from '../../constants/Colors';

const RadioButton: React.FC<{
  checked: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}> = ({ checked, setChecked }) => {
  const handleChecked = () => {
    if (setChecked) setChecked(!checked);
  };
  return (
    <Pressable style={styles.container} onPress={handleChecked}>
      <View style={[styles.outerCircle, checked && styles.outerActive]}>
        <View style={[styles.innerCircle, checked && styles.innerActive]}>
          <FontAwesome5 name="check" size={12} color="white" />
        </View>
      </View>
    </Pressable>
  );
};

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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerActive: {
    borderColor: 'transparent',
  },
  innerActive: {
    backgroundColor: Colors.light.blue,
    borderRadius: 10,
  },
});
