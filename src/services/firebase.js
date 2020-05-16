import firebase from 'firebases';
import config from '../firebaseConfig';

firebase.initialiseApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
