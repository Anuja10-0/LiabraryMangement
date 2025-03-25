import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Initialize users in localStorage
  useEffect(() => {
    if (!localStorage.getItem('libraryUsers')) {
      localStorage.setItem('libraryUsers', JSON.stringify([
        {
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
          password: "admin123",
          favorites: []
        }
      ]));
    }
  }, []);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Simple password strength calculation
    let strength = 0;
    if (value.length > 5) strength += 1;
    if (value.length > 8) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[^A-Za-z0-9]/.test(value)) strength += 1;
    setPasswordStrength(Math.min(strength, 4));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check if email exists
    const users = JSON.parse(localStorage.getItem('libraryUsers'));
    const emailExists = users.some(user => 
      user.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (emailExists) {
      setError('Email already registered');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      favorites: []
    };

    // Update users list
    users.push(newUser);
    localStorage.setItem('libraryUsers', JSON.stringify(users));
    
    // Auto-login
    localStorage.setItem('libraryAuth', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }));
    
    navigate('/dashboard');
  };

  return (
    <div className="registerContainer">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
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
          onChange={handlePasswordChange}
          required
          minLength="6"
        />
        
        <div className="passwordStrength">
          <div style={{ 
            width: `${passwordStrength * 25}%`,
            height: '100%',
            background: '#ff6b6b',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
        
        <button type="submit">Register</button>
        
        <p className="registerFooter">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;