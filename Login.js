import React from 'react';
import { GoogleLogin } from 'react-google-login';
import './Login.css'; // Ensure you have this CSS file to style the login interface

const Login = ({ onLogin }) => {
  const handleLoginSuccess = (response) => {
    console.log('Login successful', response);
    onLogin(); // Execute the action after a successful login
  };

  const handleLoginFailure = (response) => {
    console.error('Login failed', response);
  };

  return (
    <div className="login-container">
      <h2>Login with Google</h2>
      <GoogleLogin
        clientId="YOUR_CLIENT_ID.apps.googleusercontent.com" // Replace with your client ID
        buttonText="Login"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
