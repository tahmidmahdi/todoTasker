import React, { useEffect, useState } from 'react';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { db } from '../../config/firebase-config';
import taskList, { taskListType } from '../../config/taskList';
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
const ListHomeMain: React.FC = () => {
  const { userDetails } = useAuthentication();

  const [notes, setNotes] = useState<Array<ListProps>>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
        width: '70%',
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
    return (
      <Pressable style={styles.container}>
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
        width: '70%',
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
      ItemSeparatorComponent={handleSeparator}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 0,
      }}
      ListHeaderComponent={headerComponent}
      ListFooterComponent={handleSeparator}
    />
  );
};

export default ListHomeMain;
