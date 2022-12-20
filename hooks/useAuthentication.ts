import { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth();

const useAuthentication = () => {
  const [userDetails, setUserDetails] = useState<User>();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserDetails(user);
      } else {
        // User is signed out
        setUserDetails(undefined);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    userDetails,
  };
};

export default useAuthentication;
