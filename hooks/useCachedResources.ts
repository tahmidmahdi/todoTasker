import { useEffect, useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (error) {
        // We might want to provide this error information to an error reporting service
        console.warn(error);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync()
      .then(() => console.log('Loading Completed'))
      .catch(error => console.log(error));
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
