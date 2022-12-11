import React, { useState } from 'react';

import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(password);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainSection}>
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
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainSection: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
  },
  loginLabel: {
    fontSize: 16,
    color: '#252A31',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    backgroundColor: '#EBEFF5',
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});
