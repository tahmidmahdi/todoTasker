import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
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
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';

import { auth } from '../../config/firebase-config';
import Colors from '../../constants/Colors';

const { height } = Dimensions.get('window');

interface FormType {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      // saving error
    }
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(`*Please enter a correct email`)
      .required(`*Email is required`),
    password: yup
      .string()
      .min(8, `*Password should be minimum 8 character`)
      .required(`*Password is required`),
  });

  const handleFormSubmit = async (values: FormType) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response.user.email) {
        storeData(response.user?.email)
          .then(res => console.log(res, 'stored data'))
          .catch(error => console.log(error));
      }
      navigation.navigate('Root' as never);
      setLoading(false);
      showMessage({
        message: 'Login successful!',
        type: 'success',
        statusBarHeight: 50,
        icon: 'success',
        duration: 5000,
      });
    } catch (error) {
      setLoading(false);
      showMessage({
        message:
          error?.code === 'auth/user-not-found'
            ? 'Wrong Email or Password'
            : error.code,
        type: 'danger',
        statusBarHeight: 50,
        icon: 'danger',
        duration: 5000,
      });
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
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => handleFormSubmit(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View>
                  <Text style={styles.loginLabel}>
                    Login <Text style={{ color: '#F45E6D' }}>*</Text>
                  </Text>
                  <TextInput
                    placeholder="email@email.com"
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    style={[
                      styles.input,
                      errors?.email && touched?.email && styles.errorBorder,
                    ]}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
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
                    value={values.password}
                    onChangeText={handleChange('password')}
                    style={[
                      styles.input,
                      errors.password && touched.password && styles.errorBorder,
                    ]}
                    onBlur={handleBlur('password')}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <Pressable
                  style={styles.loginButton}
                  onPress={handleSubmit as never}>
                  {!loading ? (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
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
              </>
            )}
          </Formik>
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
  errorText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.light.errorRed,
  },
  errorBorder: {
    borderColor: Colors.light.errorRed,
    borderWidth: 1,
  },
});
