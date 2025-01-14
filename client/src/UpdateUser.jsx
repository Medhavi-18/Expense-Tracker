import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    comments: '',
    updatedAt: '',
  });

  // Fetch the existing data for the user when the component mounts or when the ID changes
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getUser/${id}`)
      .then((response) => {
        const { category, amount, comments, updatedAt } = response.data; // Extract fields from response
        setFormData({
          category,
          amount,
          comments,
          updatedAt: updatedAt || new Date().toISOString(), // Use the existing updatedAt or set current date and time
        });
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [id]); // Dependency array ensures this effect runs when `id` changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString(); // Get current time for updatedAt field

    // Send the updated data to the server
    axios
      .put(`http://localhost:3001/updateUser/${id}`, { ...formData, updatedAt: currentTime })
      .then(() => {
        navigate('/'); // Redirect to the home page after updating
      })
      .catch((err) => console.error('Error updating data:', err));
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4 shadow-sm">
        <h3 className="text-center mb-4">Update Expense</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter Category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter Amount"
              className="form-control"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="updatedAt" className="form-label">Updated At</label>
            <input
              type="text"
              id="updatedAt"
              name="updatedAt"
              className="form-control"
              value={formData.updatedAt}
              disabled // Disabled field to prevent manual edits
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comments" className="form-label">Comments</label>
            <textarea
              id="comments"
              name="comments"
              placeholder="Enter Comments"
              className="form-control"
              value={formData.comments}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
