import { Route, Routes } from 'react-router-dom';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';


function App() {
  return (
    <>
    
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-course" element={<AddCourse />} />
      </Routes>
    
    </>
  );
}

export default App;
