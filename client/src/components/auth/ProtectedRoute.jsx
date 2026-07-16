import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../utils/authStorage';

/**
 * Route protection wrapper blocking access to unauthenticated sessions
 */
const ProtectedRoute = () => {
  const token = getToken();

  // If no session token is stored, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Render matching nested route elements
  return <Outlet />;
};

export default ProtectedRoute;
