import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { auth } from '../config/firebase-config';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const TabTwoScreen: React.FC = () => {
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        setEmail(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    console.log('clicked');

    try {
      const logoutState = await signOut(auth);
      console.log(logoutState, 'logout state');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData()
      .then(res => console.log(email, 'get data'))
      .catch(error => console.log(error));
  }, [email]);

  if (!email) {
    return <ActivityIndicator size="large" color={Colors[colorScheme].blue} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{email}</Text>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default TabTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  logoutButton: {
    marginTop: 40,
    height: 50,
    width: '90%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
