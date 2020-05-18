import React, { useState, useEffect } from 'react';
import { firebaseApp } from './Firebase';

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userListener = firebaseApp.auth().onAuthStateChanged((authUser) => {
      authUser ? setCurrentUser(authUser) : setCurrentUser(null);
    });
    return () => userListener();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
