import React, { useEffect, useState } from 'react';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import moment from 'moment';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import FloatingButton from '../components/FloatingButton/FloatingButton';
import ListHomeMain from '../components/List/ListHome';
import { db } from '../config/firebase-config';
import useAuthentication from '../hooks/useAuthentication';
import { RootTabScreenProps } from '../types';
import AllList from './AllLists/AllList';

const { height } = Dimensions.get('window');
const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const { userDetails } = useAuthentication();

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (userDetails?.uid) {
      const q = query(
        collection(db, 'todos'),
        where('uid', '==', userDetails.uid),
        where('time', '==', moment().format('MMMM Do YYYY')),
      );
      const notesListenerSubscription = onSnapshot(q, querySnapshot => {
        const list: Array<unknown> = [];
        querySnapshot.forEach(doc => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setNotes(list as never);
        setLoading(false);
      });
      return notesListenerSubscription;
    }
    return () => null;
  }, [userDetails?.uid]);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.task}>
        <AllList notes={notes} />
      </View>
      <ScrollView>
        <ListHomeMain />
      </ScrollView>
      <FloatingButton visible />
    </View>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  taskList: {
    margin: 20,
  },
  task: {
    height: height / 2,
  },
  edit: {
    borderWidth: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
