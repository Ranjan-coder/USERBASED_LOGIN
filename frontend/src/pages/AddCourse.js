import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './AddCourse.module.css';

function AddCourse() {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    duration: '',
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/courses', courseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Course added successfully');
    } catch (err) {
      console.error('Error adding course:', err);
      alert('Error adding course');
    }
  };

  const handleBack = () => {
  navigate('/dashboard')
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>Back</button>
      <h2 className={styles.heading}>Add New Course</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          type="text"
          name="name"
          placeholder="Course Name"
          value={courseData.name}
          onChange={handleChange}
          required
        />
        <textarea
          className={styles.textareaField}
          name="description"
          placeholder="Course Description"
          value={courseData.description}
          onChange={handleChange}
          required
        />
        <input
          className={styles.inputField}
          type="text"
          name="duration"
          placeholder="Course Duration"
          value={courseData.duration}
          onChange={handleChange}
          required
        />
        <button className={styles.submitButton} type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;

