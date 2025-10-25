import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { apiRequest } from '../utils/api';

// API function to execute chat query
const executeChatQuery = async (query, getToken) => {
  return apiRequest('/api/v1/query/execute', {
    method: 'POST',
    body: { query },
  }, getToken);
};

// React Query hook for chat queries
export const useChatQuery = () => {
  const { getToken } = useAuth();
  
  return useMutation({
    mutationFn: (query) => executeChatQuery(query, getToken),
    onError: (error) => {
      console.error('Error executing chat query:', error);
    }
  });
};

export default {
  useChatQuery,
};
