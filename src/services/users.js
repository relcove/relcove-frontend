import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { queryKeys } from '../api/keys';
import { createCrudApi } from '../utils/api';

// Create users API using the generic CRUD factory with Clerk authentication
const useUsersApi = () => {
  const { getToken } = useAuth();
  return createCrudApi('/api/v1/users/', getToken);
};

// React Query hooks
export const useUsers = () => {
  const usersApi = useUsersApi();
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: usersApi.getAll,
  });
};

export const useUser = (clerkId) => {
  const usersApi = useUsersApi();
  return useQuery({
    queryKey: queryKeys.users.detail(clerkId),
    queryFn: () => usersApi.getById(clerkId),
    enabled: !!clerkId,
  });
};

export default useUsersApi;

