import React, { Suspense, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { AuthContext } from '../firebase/authentication';
import LoadingFallback from './LoadingFallback';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <Suspense fallback={<LoadingFallback />}>
          <AuthenticatedApp />
        </Suspense>
      ) : (
        <Suspense fallback={<LoadingFallback />}>
          <UnauthenticatedApp />
        </Suspense>
      )}
    </>
  );
}

export default App;
