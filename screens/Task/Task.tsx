import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '../../components/Input/Input';
import RadioButton from '../../components/RadioButton/RadioButton';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const Task = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main}>
        {/* action buttons */}
        <View style={styles.actionButtons}>
          <Pressable onPress={() => navigation.navigate('Root' as never)}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
          <Pressable onPress={() => console.log('Done Pressed')}>
            <Text style={styles.done}>Done</Text>
          </Pressable>
        </View>
        {/* taking inputs */}
        <View style={styles.inputSection}>
          <RadioButton checked={checked} setChecked={setChecked} />
          <Input />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    paddingHorizontal: 20,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: 'red',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancel: {
    fontSize: 18,
    color: Colors.light.blue,
  },
  done: {
    fontSize: 18,
    color: Colors.light.blue,
    fontWeight: 'bold',
  },
  inputSection: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
