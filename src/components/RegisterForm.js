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

      console.log(response); // Log the entire response to check the status and message

      // Check if the response status indicates success
      if (response.status >= 200 && response.status < 300) {
        // Registration success
        setSuccess('Registration successful!');
        setError(''); // Clear any previous error messages
      }
    } catch (err) {
      console.log(err); // Log the error to capture the details

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default RegisterForm;
