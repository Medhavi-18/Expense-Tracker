import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([])


  useEffect(() => { 
    axios.get('http://localhost:3001')
    .then(result => setUsers(result.data))
    .catch(err => console.log(err))
  })


  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteUser/' +id)
    .then(res => {console.log(res)
  window.location.reload()})
    .catch(err => console.log(err))
  }



  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4 shadow-sm">
        <h3 className="text-center mb-4">Expenses Tracker</h3>
        
        <Link to="/create" className="btn btn-success">Add Expenses </Link>
            <br />
            <br />
        <Link to="/chart" className="btn btn-primary mb-4">View Category Chart</Link>
            <br />
            <br />

        <div className="table-responsive"> 
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.category}</td>
                      <td>{user.amount}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.updatedAt}</td>
                      <td>{user.comments}</td>
                      <td>
                      <Link to={`/update/${user._id}`} className="btn btn-warning btn-sm mx-1">Edit Expenses</Link>
                    <button className="btn btn-danger btn-sm mx-1" onClick={(e) => handleDelete(user._id)}>Delete</button>

                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
