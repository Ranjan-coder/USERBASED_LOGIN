import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Registration.module.css';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration successful');

      localStorage.setItem('token', response.data.token);
      navigate('/'); 
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className={styles.input}
          required
        />
        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
          className={styles.input}
        >
          <option value="user">User</option>
          <option value="superuser">SuperUser</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>

      <button
        className={styles.linkButton}
        onClick={() => navigate('/')}
      >
        Go to Login
      </button>
    </div>
  );
}

export default Registration;
