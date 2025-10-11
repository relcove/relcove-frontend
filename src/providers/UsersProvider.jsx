import React, { createContext, useContext } from 'react';
import { useUsers } from '../services/users';

// Create Users Context
const UsersContext = createContext({
  users: [],
  isLoading: false,
  error: null,
  getUserByClerkId: () => null,
});

// Users Provider Component
export const UsersProvider = ({ children }) => {
  const { data: usersData, isLoading, error } = useUsers();
  const users = Array.isArray(usersData) ? usersData : [];

  // Helper function to get user by clerk_id
  const getUserByClerkId = (clerkId) => {
    return users.find(user => user.clerk_id === clerkId);
  };

  const value = {
    users,
    isLoading,
    error,
    getUserByClerkId,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

// Custom hook to use users context
export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsersContext must be used within a UsersProvider');
  }
  return context;
};

export default UsersContext;
