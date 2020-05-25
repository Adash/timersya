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
    this.signOut = this.signOut.bind(this);
    this.removeHistoryItem = this.removeHistoryItem.bind(this);
    // investigate why the bind below breaks the system
    // this.editDescription = this.editDescription.bind(this);
    this.timesHistory = this.timesHistory.bind(this);
  }

  //# Firebase Authentication
  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    console.log('signing out');
    return this.auth.signOut();
  }

  // # Firebase Database

  timesHistory() {
    return this.db.ref('TimesHistory');
  }

  removeHistoryItem(id) {
    return this.db.ref(`TimesHistory/${id}`).remove();
  }

  editDescription = (id, newDescription) => {
    try {
      this.db
        .ref(`TimesHistory/${id}`)
        .once('value')
        .then((snapshot) => {
          const record = snapshot.val();
          console.log(`description ${newDescription}`);
          this.db.ref(`TimesHistory/${id}`).set({
            ...record,
            description: newDescription,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  saveTime = (newTime) => {
    try {
      this.db.ref('TimesHistory').push(newTime);
    } catch (error) {
      console.log(`Some data fetching error: ${error}`);
    }
  };
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
