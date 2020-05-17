import React, { useState, useEffect, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BaseWrapper } from '../components/Wrappers';
import { auth } from '../firebase/';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [, setLoading] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(user);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  }, []);

  return (
    <BaseWrapper>
      {authenticated ? (
        <Suspense fallback={<div>...loading</div>}>
          <AuthenticatedApp />
        </Suspense>
      ) : (
        <Suspense fallback={<div>...loading</div>}>
          <UnauthenticatedApp />
        </Suspense>
      )}
    </BaseWrapper>
  );
}

export default App;
