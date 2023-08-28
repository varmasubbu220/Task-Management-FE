import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isEmailValid, isPasswordValid } from "../validation";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    if (isEmailValid(email) && isPasswordValid(password)) {
      history.push('/home');
    } else {
      setError("enter correct format");
    }
  };

  return (
    <div className='login-container'>
      <h1 className='title'>Login</h1>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-testid="email-input" 
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-testid="password-input" 
      />
      <h6 style={{ color: "red" }} data-testid="error-message">{error}</h6> 
      <button  onClick={handleLogin} data-testid="login-button">Login</button> 
    </div>
  );
}

export default Login;
