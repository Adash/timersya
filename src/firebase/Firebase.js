import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { config } from '../firebaseConfig';
import { FirebaseContext } from './context';

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    console.log(`Firebase initialisation...`);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // userListener = () => {
  //   const currentUser
  //   const unsubscribeUserListener = this.auth.onAuthStateChanged(user=> {
  //     if(user) {
  //       currentUser = user
  //     } else {
  //       currentUser = null
  //     }
  //   })
  //   return [currentUser, unsubscribeUserListener]
  // }
}

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default Firebase;
