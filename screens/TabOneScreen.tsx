import { useEffect, useState } from 'react';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import moment from 'moment';
import { StyleSheet } from 'react-native';

import FloatingButton from '../components/FloatingButton/FloatingButton';
import { View } from '../components/Themed';
import { db } from '../config/firebase-config';
import useAuthentication from '../hooks/useAuthentication';
import { RootTabScreenProps } from '../types';
import AllList from './AllLists/AllList';

const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const { userDetails } = useAuthentication();

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [todayDate, setTodayDate] = useState<string | undefined>();

  useEffect(() => {
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

  return (
    <View style={styles.container}>
      <AllList notes={notes} />
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
});
