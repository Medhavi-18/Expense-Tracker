import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') setCategory(value);
    if (name === 'amount') setAmount(value);
    if (name === 'comments') setComments(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString(); // Automatically set the current timestamp for createdAt

    // Send data to the server
    axios
      .post('http://localhost:3001/createUser', {
        category,
        amount,
        comments,
        createdAt: currentTime, // Automatically generated
        updatedAt: '-', // Default value for updatedAt
      })
      .then((result) => {
        console.log(result);
        navigate('/'); // Redirect to the main page after submission
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4 shadow-sm">
        <h3 className="text-center mb-4">Add Expenses</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter Category"
              className="form-control"
              value={category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter Amount"
              className="form-control"
              value={amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              placeholder="Enter Comments"
              className="form-control"
              value={comments}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
