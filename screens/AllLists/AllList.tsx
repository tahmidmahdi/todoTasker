import React, { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

import RadioButton from '../../components/RadioButton/RadioButton';
import { db } from '../../config/firebase-config';
import taskList from '../../config/taskList';
import Colors from '../../constants/Colors';

export interface NotesTypes {
  completed: boolean;
  id: string;
  time: string;
  clockTime: string;
  todo: string;
  types: string;
  uid: string;
}

const Item: React.FC<{
  item: NotesTypes;
}> = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const taskColor = taskList.find(
    list => list.name.toLowerCase() === item.types.toLowerCase(),
  );

  // eslint-disable-next-line no-shadow
  const handlePress = async (item: NotesTypes): Promise<void> => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'todos', item.id), {
        completed: !item.completed,
      });
      setLoading(false);
      showMessage({
        message: 'Note Edited Successfully',
        type: 'success',
        icon: 'success',
        statusBarHeight: 50,
        duration: 5000,
      });
    } catch (error) {
      setLoading(false);
      showMessage({
        message: 'Something went wrong',
        type: 'danger',
        icon: 'danger',
        statusBarHeight: 50,
        duration: 5000,
      });
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => void handlePress(item)}
        style={styles.item}>
        <View>
          <View style={styles.section}>
            <RadioButton checked={item.completed} />
            <Text style={[styles.title, item.completed && styles.disabled]}>
              {item.todo}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: taskColor?.backgroundColor,
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.clockStyle}>
        <Text style={styles.clockTime}>
          {moment(item.clockTime, ['HH:mm']).format('hh:mm A')}
        </Text>
      </View>
    </>
  );
};

const AllList: React.FC<{
  notes: Array<NotesTypes>;
}> = ({ notes }) => {
  const renderItem: React.FC<{
    item: NotesTypes;
  }> = ({ item }) => <Item item={item} />;

  const handleSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={handleSeparator}
      />
    </SafeAreaView>
  );
};

export default AllList;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    width: '85 %',
    backgroundColor: '#959595',
    alignSelf: 'flex-end',
  },
  disabled: {
    color: Colors.light.tabIconDefault,
  },
  clockStyle: {
    marginLeft: 50,
    marginBottom: 10,
    marginTop: -10,
  },
  clockTime: {
    color: Colors.light.tabIconDefault,
  },
});
