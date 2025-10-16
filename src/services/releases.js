import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { queryKeys } from '../api/keys';
import { createCrudApi } from '../utils/api';

// Create releases API using the generic CRUD factory with Clerk authentication
const useReleasesApi = () => {
  const { getToken } = useAuth();
  return createCrudApi('/api/v1/releases/', getToken);
};

// React Query hooks
export const useReleases = (productId = null) => {
  const releasesApi = useReleasesApi();
  return useQuery({
    queryKey: productId ? queryKeys.releases.byProduct(productId) : queryKeys.releases.list(),
    queryFn: async () => {
      if (productId) {
        // Fetch releases for specific product by sending product_id as query parameter
        const response = await releasesApi.getAll(`product_id=${productId}`);
        return response || [];
      }
      return releasesApi.getAll();
    },
  });
};

export const useRelease = (releaseId) => {
  const releasesApi = useReleasesApi();
  return useQuery({
    queryKey: queryKeys.releases.detail(releaseId),
    queryFn: () => releasesApi.getById(releaseId),
    enabled: !!releaseId,
  });
};

export const useCreateRelease = () => {
  const releasesApi = useReleasesApi();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: releasesApi.create,
    onSuccess: (newRelease) => {
      // Invalidate releases list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.releases.lists() });
      // If release has product_id, also invalidate product-specific releases
      if (newRelease?.product_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.releases.byProduct(newRelease.product_id) });
      }
    },
  });
};

export const useUpdateRelease = () => {
  const releasesApi = useReleasesApi();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ releaseId, releaseData }) => releasesApi.update(releaseId, releaseData),
    onSuccess: (updatedRelease, variables) => {
      // Invalidate specific release
      queryClient.invalidateQueries({ queryKey: queryKeys.releases.detail(variables.releaseId) });
      // Invalidate releases list
      queryClient.invalidateQueries({ queryKey: queryKeys.releases.lists() });
      // If release has product_id, also invalidate product-specific releases
      if (updatedRelease?.product_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.releases.byProduct(updatedRelease.product_id) });
      }
    },
  });
};

export const useDeleteRelease = () => {
  const releasesApi = useReleasesApi();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: releasesApi.delete,
    onSuccess: (_, releaseId) => {
      // Remove specific release from cache
      queryClient.removeQueries({ queryKey: queryKeys.releases.detail(releaseId) });
      // Invalidate releases list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.releases.lists() });
      // Invalidate all product-specific releases (since we don't know which product)
      queryClient.invalidateQueries({ queryKey: queryKeys.releases.all });
    },
  });
};

export default useReleasesApi;
