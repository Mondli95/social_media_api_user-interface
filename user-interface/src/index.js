import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthenticationContextProvider } from './context/authenticationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthenticationContextProvider>
        <App />
      </AuthenticationContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
