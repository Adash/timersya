import { auth } from '.';

export function signIn(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}
