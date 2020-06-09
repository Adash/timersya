import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './GlobalStyle';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { FirebaseProvider } from './firebase/Firebase';

import AuthProvider from './firebase/authentication';

ReactDOM.render(
  <>
    <GlobalStyle />
    <FirebaseProvider>
      <AuthProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthProvider>
    </FirebaseProvider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
