/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
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
  const [todayDate, setTodayDate] = useState<string | undefined>();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const days = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  useEffect(() => {
    setTodayDate(`${year}-${month}-${days}`);
  }, []);

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
        <View style={styles.calendar}>
          <Calendar
            initialDate={todayDate}
            minDate={todayDate}
            onDayPress={day => {
              console.log('selected day', day);
            }}
            firstDay={1}
            showWeekNumbers
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableAllTouchEventsForDisabledDays
            enableSwipeMonths
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '800',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 24,
            }}
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
    backgroundColor: 'white',
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
  calendar: {},
});
