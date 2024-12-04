import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css'; 

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={credentials.email}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={credentials.password}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <button
        className={styles.linkButton}
        onClick={() => navigate('/register')}
      >
        Go to Registration
      </button>
    </div>
  );
}

export default Login;
