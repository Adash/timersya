import React, { Suspense, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { AuthContext } from '../firebase/authentication';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <Suspense fallback={<div>...loading</div>}>
          <AuthenticatedApp />
        </Suspense>
      ) : (
        <Suspense fallback={<div>...loading</div>}>
          <UnauthenticatedApp />
        </Suspense>
      )}
    </>
  );
}

export default App;
