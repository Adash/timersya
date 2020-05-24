import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext, AuthContext } from './context';

const AuthProvider = ({ children }) => {
  const Firebase = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log('Authentication listener. You should see it only once');
    const userListener = Firebase.auth.onAuthStateChanged((authUser) => {
      authUser ? setCurrentUser(authUser) : setCurrentUser(null);
    });
    return () => userListener();
  }, [Firebase]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
