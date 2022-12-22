/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
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
  const route = useRoute();
  console.log(route.name);
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
        <Calendar
          // Initially visible month. Default = now
          initialDate="2022-03-01"
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            console.log('selected day', day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat="yyyy MM"
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows
          // Replace default arrows with custom ones (direction can be 'left' or 'right')

          // Do not show days of other months in month page. Default = false
          hideExtraDays
          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames
          // Show week numbers to the left. Default = false
          showWeekNumbers
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft
          // Disable right arrow. Default = false
          disableArrowRight
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays
          // Replace default month and year title with custom one. the function receive a date as parameter
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths
        />
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
