// AdminProtectedRoute.jsx
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()

  const role = user?.role || '';
  
  useEffect (() => {
    if(role === 'student'){
        navigate("/student/dashboard")
    }
  }, [user, navigate, role]);

  if (role !== 'admin') {
    return <Navigate to="/adminsignin" replace />;
  }

  return children;
};

export default StudentProtectedRoute;
