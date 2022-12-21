import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '../../components/Input/Input';
import RadioButton from '../../components/RadioButton/RadioButton';
import { db } from '../../config/firebase-config';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const Task = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');
  const [todoTypes, setTodoTypes] = useState<string>('inbox');

  const handleSubmitTodo = async (): Promise<void> => {
    if (text !== '') {
      try {
        const storeTodo = await addDoc(collection(db, 'todos'), {
          todo: text,
          completed: checked,
          types: todoTypes,
          time: 'December 22,2022 ar 4:04:00 PM UTC+6',
        });
        console.log(storeTodo);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main}>
        {/* action buttons */}
        <View style={styles.actionButtons}>
          <Pressable onPress={() => navigation.navigate('Root' as never)}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleSubmitTodo}>
            <Text style={styles.done}>Done</Text>
          </Pressable>
        </View>
        {/* taking inputs */}
        <View style={styles.inputSection}>
          <RadioButton checked={checked} setChecked={setChecked} />
          <Input
            placeholder="What do you want to do?"
            multiline
            setText={setText}
            style={{ marginLeft: 20 }}
          />
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
