import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password}),
    });

    const {user} = await resp.json();


    // const users = JSON.parse(localStorage.getItem('users')) || [];
    // const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      console.log('Login successful');
      setError('');
      setSuccessMessage('Login successful!');
      setEmail('');
      setPassword('');
    } else {
      setError('Invalid email or password');
      setSuccessMessage('');
    }
  };

  const handleRedirectToIndex = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <Link to="/signup" className="create-account-btn">
          Create Account
        </Link>
        <button onClick={handleRedirectToIndex} className="index-btn">
          Go Home
        </button>
      </form>
    </div>
  );
}

export default Login;