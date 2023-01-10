import React, { useEffect, useState } from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { db } from '../../config/firebase-config';
import taskList from '../../config/taskList';
import Colors from '../../constants/Colors';
import useAuthentication from '../../hooks/useAuthentication';

interface ListProps {
  completed: boolean;
  id: string;
  time: string;
  todo: string;
  types: string;
  uid: string;
}
const ListMain: React.FC<{
  todoTypes: string;
  setTodoTypes: React.Dispatch<React.SetStateAction<string>>;
  setListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ todoTypes, setTodoTypes, setListOpen }) => {
  const { userDetails } = useAuthentication();

  const [notes, setNotes] = useState<Array<ListProps>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const list = ({ item }) => {
    const { name, color, backgroundColor } = item;
    const toggleSelection = (todoName: string) => {
      setTodoTypes(todoName);
    };
    const styles = StyleSheet.create({
      container: {
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      main: {
        justifyContent: 'center',
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
    return (
      <Pressable
        style={styles.container}
        onPress={() => toggleSelection(name as string)}>
        <View style={styles.main}>
          <Text style={styles.listText}>{name}</Text>
          <Text>{listCheck.length} tasks</Text>
        </View>
        {todoTypes.toLowerCase() === name.toLowerCase() && (
          <View style={styles.tick}>
            <FontAwesome5 name="check" size={10} color={Colors.light.blue} />
          </View>
        )}
      </Pressable>
    );
  };

  useEffect(() => {
    if (userDetails?.uid) {
      const q = query(
        collection(db, 'todos'),
        where('uid', '==', userDetails.uid),
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

  return (
    <FlatList
      data={taskList}
      renderItem={list}
      keyExtractor={item => item.name}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 0,
      }}
    />
  );
};

export default ListMain;
