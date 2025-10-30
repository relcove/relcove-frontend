import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { queryKeys } from '../api/keys';
import { createCrudApi } from '../utils/api';

// Create products API using the generic CRUD factory with Clerk authentication
const useProductsApi = () => {
  const { getToken } = useAuth();
  return createCrudApi('/api/v1/products/', getToken);
};

// React Query hooks
export const useProducts = () => {
  const productsApi = useProductsApi();
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: productsApi.getAll,
  });
};

export const useProduct = (productId) => {
  const productsApi = useProductsApi();
  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => productsApi.getById(productId),
    enabled: !!productId,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const productsApi = useProductsApi();

  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const productsApi = useProductsApi();

  return useMutation({
    mutationFn: ({ productId, productData }) =>
      productsApi.update(productId, productData),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.products.detail(variables.productId), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const productsApi = useProductsApi();

  return useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};

export default useProductsApi;
