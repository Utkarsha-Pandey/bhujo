import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="219497825691-ilm4nm3921o0f1bck1mao8flfa27bcce.apps.googleusercontent.com">;
    <BrowserRouter>

    <App />

    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
