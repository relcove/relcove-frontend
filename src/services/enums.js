import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { queryKeys } from '../api/keys';
import { apiRequest } from '../utils/api';

// Hook to fetch product status enum
export const useProductStatusEnum = () => {
  const { getToken } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.enums.productStatus(),
    queryFn: async () => {
      const response = await apiRequest('/api/v1/enums/product-status', {}, getToken);
      return response || [];
    },
  });
};

export default useProductStatusEnum;
