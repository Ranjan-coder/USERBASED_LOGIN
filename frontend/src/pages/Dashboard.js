import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css'; 

function Dashboard() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); 
    } else {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRole(decodedToken.role); 

      // Fetch courses based on the user's role
      fetchCourses();
    }
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderCourses = () => {
    if (role === 'admin') {
      return courses.map((course) => (
        <div className={styles.courseCard} key={course._id}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <p>{course.duration}</p>
        </div>
      ));
    } else if (role === 'superuser') {
      return courses.map((course) => (
        <div className={styles.courseCard} key={course._id}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <p>{course.duration}</p>
        </div>
      ));
    } else if (role === 'user') {
      return courses.map((course) => (
        <div className={styles.courseCard} key={course._id}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
        </div>
      ));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dashboard</h2>
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className={styles.courseList}>
          {role === 'admin' && <p className={styles.roleMessage}>Admin View: You can view all courses</p>}
          {role === 'superuser' && (
            <>
              <p className={styles.roleMessage}>Super User View: You can view and add courses</p>
              <Link className={styles.addCourseLink} to="/add-course">Add a New Course</Link>
            </>
          )}
          {role === 'user' && <p className={styles.roleMessage}>User View: You can view courses</p>}
          {renderCourses()}
        </div>
      )}
      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}

export default Dashboard;
