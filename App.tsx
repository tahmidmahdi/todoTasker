import { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { auth } from './config/firebase-config';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const App = () => {
  const [userState, setUserState] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUserState(user?.uid);
        setLoading(false);
      } else {
        console.log('User is not signed in');
        setLoading(false);
      }
    });
  }, []);

  if (!isLoadingComplete && loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} userState={userState} />
      <StatusBar />
    </SafeAreaProvider>
  );
};

export default App;
