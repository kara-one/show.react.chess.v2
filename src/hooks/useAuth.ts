import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { User } from '@firebase/auth/dist/auth-public';


interface AuthState {
  isSignedIn: boolean;
  pending: boolean;
  user: User | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) =>
      setAuthState({ user, pending: false, isSignedIn: !!user }),
    );
    return () => unregisterAuthObserver();
  }, []);

  return { auth, ...authState };
}
