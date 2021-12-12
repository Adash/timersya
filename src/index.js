import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { FirebaseProvider } from './firebase/Firebase';
import AuthProvider from './firebase/authentication';
import { BrowserRouter } from 'react-router-dom';

// ReactDOM.render(
//   <FirebaseProvider>
//     <AuthProvider>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </AuthProvider>
//   </FirebaseProvider>,
//   document.getElementById('root')
// );

const Core = () => (
  <FirebaseProvider>
    <AuthProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AuthProvider>
  </FirebaseProvider>
);
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Core />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register();
