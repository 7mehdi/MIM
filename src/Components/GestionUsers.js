import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'; // For brand icons
import { fas } from '@fortawesome/free-solid-svg-icons'; // For solid icons
import '../style/GestionUsers.css';
import NavBar from './navBar';
import axios from 'axios';

library.add(fab, fas);

function GestionUsers() {
  // State variables
  const [users, setUsers] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: '' });
  const [selectedUserId, setSelectedUserId] = useState('');

  // Fetch users from the API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle form submission to create a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:7000/api1/users', newUser);
      setNewUser({ name: '', email: '', password: '', role: '' });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:7000/api1/users/${userId}`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle modifying the role of a user
  const handleModifyRole = (userId) => {
    setSelectedUserId(userId);
  };

  // Handle saving the modified role
  const handleSaveRole = async () => {
    try {
      await axios.put(`http://localhost:7000/api1/users/${selectedUserId}`, { role: newRole });
      setSelectedUserId('');
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-main"> 
       <h2>User Management</h2>    
        <div className="user-management">
        
          <div>
          
            <h3>Create User</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input type="text" name="name" value={newUser.name} onChange={handleInputChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={newUser.email} onChange={handleInputChange} required />
                <label>Password:</label>
                <input type="password" name="password" value={newUser.password} onChange={handleInputChange} required />
                <label>Role:</label>

                <select name="role" value={newUser.role} onChange={handleInputChange} required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
      
              </div>
              <button type="submit">Create User</button>
            </form>
          </div>
          <div className='userList'>
            <h3>User List</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="role">
                      {user.role}
                    </td>
                    <td>
                    <button onClick={() => handleModifyRole(user.id)}>Modify Role</button>

                    <FontAwesomeIcon className="Delete" onClick={() => handleDeleteUser(user.id)}  icon={['fas', 'trash-alt']} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedUserId && (
              <div>
                <h3>Modify Role</h3>
                <div>
                  <label>Role:</label>
                  <select name="role" value={newRole} onChange={(e) => setNewRole(e.target.value)} required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button onClick={handleSaveRole}>Save Role</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GestionUsers;
