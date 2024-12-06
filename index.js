import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <GoogleOAuthProvider clientId="704734077885-1s8iov2j0rl829n1ahmh5r1ri9op4h3g.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
