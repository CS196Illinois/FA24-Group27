import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';

function Login({ onLoginSuccess }) {
  const handleLoginSuccess = (response) => {
    console.log("Login Success: currentUser:", response);
    onLoginSuccess(response);
  };

  const handleLoginFailure = (response) => {
    console.log("Login failed: response:", response);
  };

  return (
    <div className="login-container">
      <h2>Please log in to continue</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />
    </div>
  );
}

export default Login;
