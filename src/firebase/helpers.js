import { auth } from './Firebase';

export function signIn(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}
