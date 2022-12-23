import { useRoute } from '@react-navigation/native';
import { Pressable, StyleSheet, Text } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import FloatingButton from '../components/FloatingButton/FloatingButton';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {
  console.log(navigation);
  const route = useRoute();
  console.log(route.name);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Back</Text>
      </Pressable>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <FloatingButton visible />
    </View>
  );
};

export default TabOneScreen;

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
});
