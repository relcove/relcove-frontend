import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { queryKeys } from '../api/keys';
import { createCrudApi } from '../utils/api';

// Create feature flags API using the generic CRUD factory with Clerk authentication
const useFeatureFlagsApi = () => {
  const { getToken } = useAuth();
  return createCrudApi('/api/v1/feature-flags/', getToken);
};

// React Query hooks for feature flags
export const useFeatureFlags = () => {
  const featureFlagsApi = useFeatureFlagsApi();
  return useQuery({
    queryKey: queryKeys.featureFlags.list(),
    queryFn: featureFlagsApi.getAll,
  });
};

export const useFeatureFlag = (flagId) => {
  const featureFlagsApi = useFeatureFlagsApi();
  return useQuery({
    queryKey: queryKeys.featureFlags.detail(flagId),
    queryFn: () => featureFlagsApi.getById(flagId),
    enabled: !!flagId,
  });
};

export const useCreateFeatureFlag = () => {
  const queryClient = useQueryClient();
  const featureFlagsApi = useFeatureFlagsApi();

  return useMutation({
    mutationFn: featureFlagsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.featureFlags.lists() });
    },
  });
};

export const useUpdateFeatureFlag = () => {
  const queryClient = useQueryClient();
  const featureFlagsApi = useFeatureFlagsApi();

  return useMutation({
    mutationFn: ({ flagId, flagData }) =>
      featureFlagsApi.update(flagId, flagData),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.featureFlags.detail(variables.flagId), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.featureFlags.lists() });
    },
  });
};

export const useDeleteFeatureFlag = () => {
  const queryClient = useQueryClient();
  const featureFlagsApi = useFeatureFlagsApi();

  return useMutation({
    mutationFn: featureFlagsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.featureFlags.lists() });
    },
  });
};

export default useFeatureFlagsApi;
