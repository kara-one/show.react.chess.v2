import { FirebaseError, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBOBTtGdgy6UbLtFqXzBuf4Dhp9RN4_fCc',
  authDomain: 'react-chess-fdda6.firebaseapp.com',
  projectId: 'react-chess-fdda6',
  storageBucket: 'react-chess-fdda6.appspot.com',
  messagingSenderId: '903307277231',
  appId: '1:903307277231:web:2c448c962ed472f898f55a',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

export const userSignUp = async (email: string, password: string) => {
  const response = {
    status: false,
    message: '',
  };

  try {
    const signUp = await createUserWithEmailAndPassword(auth, email, password);
    console.log('signUp: ', signUp);
  } catch (error: unknown) {
    const { code } = error as FirebaseError;
    console.log('error: ', code);
  }

  return response;
};

export const userSignIn = async (email: string, password: string) => {
  const response = {
    status: false,
    message: '',
  };

  try {
    const signIn = await signInWithEmailAndPassword(auth, email, password);
    console.log('signIn: ', signIn);
  } catch (error: unknown) {
    const { code } = error as FirebaseError;
    console.log('error: ', code);
    if (code === 'auth/user-not-found') {
      const signUp = userSignUp(email, password);
      console.log('signUp: ', signUp);
    }
  }

  return response;
};
