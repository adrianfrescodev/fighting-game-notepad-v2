import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseClient';
import { useEffect, useState } from 'react';

function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setLoggedIn(true);
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
      } else {
        setLoggedIn(false);
        localStorage.removeItem('token');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return { loggedIn };
}

export default useAuth;
