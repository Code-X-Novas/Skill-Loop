// AdminProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()

  const role = user?.role || '';
  
  useEffect (() => {
    if(role === 'student'){
        navigate("/")
    }
  })

  if (role !== 'admin') {
    return <Navigate to="/adminsignin" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
