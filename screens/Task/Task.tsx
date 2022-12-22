/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
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
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const handleSubmitTodo = async (): Promise<void> => {
    if (text !== '') {
      try {
        await addDoc(collection(db, 'todos'), {
          todo: text,
          completed: checked,
          types: todoTypes,
          time: moment().format('MMMM Do YYYY [at] h:mm:ss A'),
        });
        showMessage({
          message: 'Todo added successfully!',
          type: 'success',
          hideStatusBar: true,
          icon: 'success',
        });
      } catch (error) {
        showMessage({
          message: 'Failed to add todo. Please try again later!',
          type: 'danger',
          hideStatusBar: true,
          icon: 'danger',
        });
      }
    } else {
      showDialog();
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
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Text field can not be empty!</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
