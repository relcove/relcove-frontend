import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import DefaultLoader from './DefaultLoader';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const location = useLocation();

  // Show loading while auth state is being determined
  if (!isLoaded) {
    return <DefaultLoader/>;
  }

  // If not signed in, redirect to login
  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has organization membership
  const hasOrganization = user?.organizationMemberships?.length > 0;

  // If user is on login/signup pages but is signed in, redirect to home
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return <Navigate to="/" replace />;
  }

  // If user is signed in but not part of an organization, redirect to org setup
  if (!hasOrganization && location.pathname !== '/join-or-create-org') {
    return <Navigate to="/join-or-create-org" replace />;
  }

  return children;
};

export default ProtectedRoute;
