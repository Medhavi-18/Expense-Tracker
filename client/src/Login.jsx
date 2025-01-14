import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // For showing loading state
  const [errorMessage, setErrorMessage] = useState(null); // For handling error messages

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrorMessage(null); // Clear error message on input change
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state

    if (!credentials.username || !credentials.password) {
      setLoading(false);
      setErrorMessage('Username and password are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', credentials);
      setLoading(false);  // Reset loading state
      alert(response.data.message);

      // Save token or user info in local storage or state (if token-based auth is implemented)
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirect to home or dashboard page
    } catch (error) {
      setLoading(false);  // Reset loading state

      if (error.response) {
        // Server returned an error response
        setErrorMessage(error.response.data.error || 'Invalid username or password');
      } else {
        // Network error or no response
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <form
        className="bg-white p-5 rounded shadow"
        onSubmit={handleLogin}
        style={{ width: '400px' }}
      >
        <h3 className="mb-4 text-center" style={{ color: '#007bff' }}>Login to Expense Tracker</h3>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {/* Username Input */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="form-control"
            value={credentials.username}
            onChange={handleInputChange}
            required
            aria-label="Username"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="form-control"
            value={credentials.password}
            onChange={handleInputChange}
            required
            minLength={6} // Optional: Ensure a minimum password length
            aria-label="Password"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="btn btn-primary w-100" 
          disabled={loading} // Disable button when loading
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        {/* Redirect to Signup */}
        <p className="mt-3 text-center">
          Don't have an account? <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
