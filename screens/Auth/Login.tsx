import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth } from '../../config/firebase-config';

const { height } = Dimensions.get('window');

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Root' as never);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainSection}>
          <View style={styles.imageSection}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/Logo.png')}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.loginLabel}>
              Login <Text style={{ color: '#F45E6D' }}>*</Text>
            </Text>
            <TextInput
              placeholder="email@email.com"
              placeholderTextColor="#808080"
              autoCapitalize="none"
              keyboardType="email-address"
              onChange={event => setEmail(event.nativeEvent.text)}
              style={styles.input}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.loginLabel}>
              Password <Text style={{ color: '#F45E6D' }}>*</Text>
            </Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#808080"
              autoCapitalize="none"
              keyboardType="default"
              secureTextEntry
              onChange={event => setPassword(event.nativeEvent.text)}
              style={styles.input}
            />
          </View>
          <Pressable style={styles.loginButton} onPress={handleLogin as never}>
            {!loading ? (
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                Login
              </Text>
            ) : (
              <View style={styles.loadingSection}>
                <ActivityIndicator size="small" color="white" />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 10,
                  }}>
                  Loading...
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainSection: {
    height,
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginBottom: 70,
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 300,
  },
  loginLabel: {
    fontSize: 16,
    color: '#252A31',
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    backgroundColor: '#EBEFF5',
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  loginButton: {
    height: 60,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
