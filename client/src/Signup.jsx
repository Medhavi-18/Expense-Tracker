import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    monthlyBudget: '',
    currency: 'USD',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/signup', formData)
      .then((response) => {
        alert(response.data.message);
        navigate('/login');
      })
      .catch((error) => alert(error.response.data.error));
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <form className="bg-white p-5 rounded shadow" onSubmit={handleSignup} style={{ width: '400px' }}>
        <h3 className="mb-4 text-center" style={{ color: '#007bff' }}>Create Your Account</h3>
        
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a strong password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="monthlyBudget" className="form-label">Monthly Budget ($)</label>
          <input
            type="number"
            id="monthlyBudget"
            name="monthlyBudget"
            placeholder="Enter your budget"
            className="form-control"
            value={formData.monthlyBudget}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="currency" className="form-label">Currency Preference</label>
          <select
            id="currency"
            name="currency"
            className="form-select"
            value={formData.currency}
            onChange={handleInputChange}
            required
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="AUD">AUD - Australian Dollar</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>

        <p className="mt-3 text-center">
          Already have an account? <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Log In</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
