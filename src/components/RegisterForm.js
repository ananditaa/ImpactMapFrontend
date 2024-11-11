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
      // Make the POST request to the backend API
      const response = await axios.post('https://impactmapbackend-1.onrender.com/register', { username, password });

      console.log(response); // Log the response to check the status and message

      if (response.status === 201) {
        // Registration success
        setSuccess('Registration successful!');
        setError(''); // Clear any previous error messages
      }
    } catch (err) {
      console.log(err); // Log the error details

      if (err.response) {
        // Check for specific error responses
        if (err.response.status === 400 && err.response.data.msg === 'User already exists') {
          setError('This username is already taken. Please choose another one.');
        } else {
          // General registration failure
          setError('Registration failed. Please try again.');
        }
      } else {
        // Handle network or unexpected errors
        setError('An error occurred. Please try again later.');
      }

      // Clear the success message if an error occurs
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

        {/* Show error message if there's any */}
        {error && <p className="error-message">{error}</p>}
        
        {/* Show success message if registration is successful */}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
