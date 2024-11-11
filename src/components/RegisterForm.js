import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import the CSS file for styling

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://impactmapbackend-1.onrender.com/register', { username, password });

      console.log(response);

      if (response.status === 201) {
        // Registration success
        setSuccess('Registration successful!');
        setError(''); // Clear any previous error messages
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400 && err.response.data.msg === 'User already exists') {
          // Specific error for user already exists
          setError('This username is already taken. Please choose another one.');
        } else {
          // General registration failure
          setError('Registration failed. Please try again.');
        }
      } else {
        // Handle network error or unexpected failure
        setError('An error occurred. Please try again later.');
      }

      // Clear the success message if any error occurs
      setSuccess('');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create an Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
