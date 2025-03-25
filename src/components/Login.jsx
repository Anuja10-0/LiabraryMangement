import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUserByEmail, initializeUsers } from './users';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    initializeUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedEmail || !trimmedPassword) {
      setError('Please fill in all fields');
      return;
    }
  
    const user = findUserByEmail(trimmedEmail);
  
    if (!user || user.password !== trimmedPassword) {
      setError('Invalid email or password');
      return;
    }
  
    localStorage.setItem('libraryAuth', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name
    }));
  
    // Add console log to verify execution reaches here
    console.log('Login successful, redirecting...');
    navigate('/dashboard');
    console.log('Navigate function called'); // Should see this in console
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;