import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useSelector } from 'react-redux';
import './listUsers.css';

export default function ListUsers() {
  const { user } = useSelector((state) => state.user || {});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('api/users/list', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    })();
  }, []);

  if (!user) {
    return <p className="loading">Loading...</p>;
  }

  const handleRemove = async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setUsers(users.filter((ele) => ele._id !== response.data._id));
    } catch (err) {
      console.error('Error removing user:', err);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      const response = await axios.put(
        `/api/users/change-role/${userId}`,
        { role },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setUsers(users.map((ele) => (ele._id === response.data._id ? response.data : ele)));
    } catch (err) {
      console.error('Error changing role:', err);
    }
  };

  return (
    <div className="list-users">
      <h2 className="title">Listing Users - {users.length}</h2>
      <ul className="user-list">
        {users.map((ele) => (
          <li key={ele._id} className="user-item">
            <div className="user-info">
              <span className="user-email">{ele.email}</span>
              <span className="user-role">{ele.role}</span>
            </div>
            {user.role === 'admin' && user._id !== ele._id && (
              <div className="admin-actions">
                <select
                  className="role-select"
                  value={ele.role}
                  onChange={(e) => handleRoleChange(ele._id, e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="user">User</option>
                </select>
                <button className="remove-btn" onClick={() => handleRemove(ele._id)}>
                  Remove
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
