import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { config } from '../firebaseConfig';

export const firebaseApp = firebase.initializeApp(config);
console.log(firebaseApp);

// below two methods will be deprecated soon
export const auth = firebase.auth;
export const db = firebase.database();
