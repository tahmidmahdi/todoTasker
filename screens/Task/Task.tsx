/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';

import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import CalendarMain from '../../components/Calendar/CalendarMain';
import Input from '../../components/Input/Input';
import ListMain from '../../components/List/Index';
import RadioButton from '../../components/RadioButton/RadioButton';
import { db } from '../../config/firebase-config';
import Colors from '../../constants/Colors';
import capitalizeFirstLetter from '../../hooks/firstLetterUppercase';
import useAuthentication from '../../hooks/useAuthentication';

const { height, width } = Dimensions.get('window');
const Task = () => {
  const navigation = useNavigation();
  const { userDetails } = useAuthentication();

  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');
  const [todoTypes, setTodoTypes] = useState<string>('inbox');
  const [visible, setVisible] = useState(false);
  const [todayDate, setTodayDate] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState<{
    calendar: boolean;
    time: boolean;
  }>({
    calendar: false,
    time: false,
  });
  const [calendarDate, setCalendarDate] = useState<string>('');
  const [listOpen, setListOpen] = useState<boolean>(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const days = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const handleSubmitTodo = async (): Promise<void> => {
    if (text !== '') {
      try {
        await addDoc(collection(db, 'todos'), {
          todo: text,
          completed: checked,
          types: todoTypes,
          time: calendarDate || moment().format('MMMM Do YYYY [at] h:mm:ss A'),
          uid: userDetails?.uid,
        });
        showMessage({
          message: 'Todo added successfully!',
          type: 'success',
          hideStatusBar: true,
          icon: 'success',
          duration: 5000,
        });
        navigation.navigate('Root' as never);
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

  const handleListOpen = () => {
    setListOpen(!listOpen);
  };

  const handleCalender = () => {
    setSelectedOption({
      calendar: false,
      time: false,
    });
  };

  useEffect(() => {
    setTodayDate(`${year}-${month}-${days}`);
  }, []);

  useEffect(() => {
    if (listOpen) {
      setSelectedOption({
        ...selectedOption,
        calendar: false,
      });
    }
    if (selectedOption.calendar) {
      setListOpen(false);
    }
  }, [listOpen, selectedOption.calendar]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
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
        <View style={styles.inputSection} onTouchStart={handleCalender}>
          <RadioButton checked={checked} setChecked={setChecked} />
          <Input
            placeholder="What do you want to do?"
            multiline
            setText={setText}
            style={{ marginLeft: 20 }}
          />
        </View>

        <View style={styles.bottomMain}>
          <View style={[styles.bottomSection, listOpen && styles.listActive]}>
            <View style={styles.timeSection}>
              <FontAwesome
                name="calendar-o"
                size={20}
                onPress={() =>
                  setSelectedOption({
                    ...selectedOption,
                    calendar: !selectedOption.calendar,
                  })
                }
                style={{
                  color: selectedOption.calendar
                    ? Colors.light.blue
                    : '#999999',
                }}
              />
              <AntDesign
                name="clockcircleo"
                size={20}
                style={{
                  marginLeft: 30,
                  color: selectedOption.time ? Colors.light.blue : '#999999',
                }}
                onPress={() =>
                  setSelectedOption({
                    ...selectedOption,
                    time: !selectedOption.time,
                  })
                }
              />
            </View>
            <Pressable onPress={handleListOpen}>
              <Text style={{ fontWeight: 'bold' }}>
                {capitalizeFirstLetter(todoTypes)}
              </Text>
            </Pressable>
          </View>
          {selectedOption.calendar && (
            <CalendarMain
              setCalendarDate={setCalendarDate}
              todayDate={todayDate}
            />
          )}
          {listOpen && (
            <ListMain
              todoTypes={todoTypes}
              setTodoTypes={setTodoTypes}
              setListOpen={setListOpen}
            />
          )}
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
      </View>
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
    flex: 1,
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
  bottomMain: {
    height: 'auto',
    bottom: 0,
    position: 'absolute',
    width,
    paddingHorizontal: 20,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listActive: {
    marginBottom: 20,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
