import { Dispatch } from 'react';
import { UserActions } from '../../../types/typesUser/typesUserActions';
import { auth, userSignIn } from '../../../firebase';

const userAuth = (email: string, password: string): Function => {
  return (dispatch: Dispatch<UserActions>, getState: Function): void => {
    const user = auth.currentUser;
    console.log('action');
    console.log('user: ', user);

    if (user === null) {
      const userData = userSignIn(email, password);
      console.log('userData: ', userData);
    }
  };
};
export default userAuth;
