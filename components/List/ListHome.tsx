import React, { useEffect, useRef, useState } from 'react';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import moment from 'moment';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import { db } from '../../config/firebase-config';
import taskList, { taskListType } from '../../config/taskList';
import Colors from '../../constants/Colors';
import useAuthentication from '../../hooks/useAuthentication';
import AllList from '../../screens/AllLists/AllList';

const { height } = Dimensions.get('window');
interface ListProps {
  completed: boolean;
  id: string;
  time: string;
  todo: string;
  types: string;
  uid: string;
}
const ListHomeMain: React.FC = () => {
  const { userDetails } = useAuthentication();

  const [notes, setNotes] = useState<Array<ListProps>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<taskListType>();
  const [total, setTotal] = useState<Array<ListProps>>([]);

  const refRBSheet = useRef();

  const list: React.FC<{
    item: taskListType;
  }> = ({ item }) => {
    const { name, color, backgroundColor } = item;
    const styles = StyleSheet.create({
      container: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor,
        paddingVertical: 15,
        width: '75%',
        alignSelf: 'flex-end',
      },
      main: {
        justifyContent: 'flex-end',
      },
      listText: {
        fontSize: 16,
        fontWeight: 'bold',
        color,
      },
      tick: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    const listCheck = notes.filter(
      note => note.types.toLowerCase() === name.toLowerCase(),
    );

    const handleSelect = (task: taskListType) => {
      setSelected(task);
      refRBSheet?.current?.open();
    };

    return (
      <Pressable onPress={() => handleSelect(item)} style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.listText}>{name}</Text>
          <Text>{listCheck.length} tasks</Text>
        </View>
      </Pressable>
    );
  };

  const handleSeparator = () => <View style={{ height: 10 }} />;

  const headerComponent = () => (
    <View
      style={{
        marginHorizontal: 20,
        width: '75%',
        alignSelf: 'flex-end',
        marginBottom: 8,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'gray',
        }}>
        List
      </Text>
    </View>
  );

  useEffect(() => {
    if (userDetails?.uid) {
      const q = query(
        collection(db, 'todos'),
        where('uid', '==', userDetails.uid),
        where('time', '==', moment().format('MMMM Do YYYY')),
      );
      const notesListenerSubscription = onSnapshot(q, querySnapshot => {
        const listName: Array<unknown> = [];
        querySnapshot.forEach(doc => {
          listName.push({ ...doc.data(), id: doc.id });
        });
        setNotes(listName as never);
        setLoading(false);
      });
      return notesListenerSubscription;
    }
    return () => null;
  }, [userDetails?.uid]);

  useEffect(() => {
    setTotal(
      notes.filter(
        note => note.types.toLowerCase() === selected?.name.toLowerCase(),
      ),
    );
  }, [notes, selected]);
  console.log(notes, '******', selected);

  return (
    <View>
      <FlatList
        data={taskList}
        renderItem={list}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={handleSeparator}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'flex-end',
          marginTop: 0,
        }}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={handleSeparator}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask={false}
        height={height - 100}
        customStyles={{
          container: {
            backgroundColor: selected?.backgroundColor,
            padding: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          draggableIcon: {
            backgroundColor: 'gray',
          },
        }}>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: selected?.color,
            }}>
            {selected?.name}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: selected?.color,
            }}>
            {total.length} task(s)
          </Text>
          <View
            style={{
              marginLeft: -30,
            }}>
            <AllList notes={total} />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default ListHomeMain;
