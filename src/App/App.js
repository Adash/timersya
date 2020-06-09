import React, { useState, Suspense, useContext } from 'react';
import { AuthContext } from '../firebase/context';
import LoadingFallback from './LoadingFallback';
import Theme from './Theme';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

export const ThemeContext = React.createContext(null);

function App() {
  const { currentUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(true);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme theme={theme}>
        {currentUser ? (
          <Suspense fallback={<LoadingFallback />}>
            <AuthenticatedApp />
          </Suspense>
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <UnauthenticatedApp />
          </Suspense>
        )}
      </Theme>
    </ThemeContext.Provider>
  );
}

export default App;
