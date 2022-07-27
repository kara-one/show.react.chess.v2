import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

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
