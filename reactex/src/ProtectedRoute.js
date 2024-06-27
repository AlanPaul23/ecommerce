import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = sessionStorage.getItem('authToken');
    console.log('Auth Token:', token);
    return !!token;
  };

  const auth = isAuthenticated();
  console.log('Is Authenticated:', auth);

  return auth ? <Component {...rest} /> : <Navigate to="/login1" replace />;
};

export default ProtectedRoute;
