import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("asdasdasdasasdas");
    const resp = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password,name}),
    });

    const user = resp.json();

    console.log(user)

    // if (userExists) {
    //   setError('Email already exists');
    //   setSuccessMessage('');
    // } else {
    //   const newUser = { name, email, password };
    //   const updatedUsers = [...users, newUser];
    //   localStorage.setItem('users', JSON.stringify(updatedUsers));
    //   console.log('Signup successful');
    //   setError('');
    //   setSuccessMessage('Signup successful!');
    //   setName('');
    //   setEmail('');
    //   setPassword('');
    // }
  };

  const handleRedirectToIndex = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <button onClick={handleRedirectToIndex} className="index-btn index-btn1">
          Go Home
        </button>
      </form>
    </div>
  );
}

export default Signup;