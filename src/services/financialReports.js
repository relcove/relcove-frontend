import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { apiRequest } from '../utils/api';

// API function to get financial reports options
const getFinancialReportsOptions = async (getToken) => {
  return apiRequest('/api/v1/financial-reports/options', {}, getToken);
};

// API function to get financial reports data
const getFinancialReportsData = async (timePeriodLabel, entity, getToken) => {
  const params = new URLSearchParams({
    time_period_label: timePeriodLabel,
    entity: entity
  });
  return apiRequest(`/api/v1/financial-reports/reports?${params}`, {}, getToken);
};

// React Query hook for financial reports options
export const useFinancialReportsOptions = () => {
  const { getToken } = useAuth();
  
  return useQuery({
    queryKey: ['financial-reports', 'options'],
    queryFn: () => getFinancialReportsOptions(getToken),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// React Query hook for financial reports data
export const useFinancialReportsData = (timePeriodLabel, entity, enabled = false) => {
  const { getToken } = useAuth();
  
  return useQuery({
    queryKey: ['financial-reports', 'data', timePeriodLabel, entity],
    queryFn: () => getFinancialReportsData(timePeriodLabel, entity, getToken),
    enabled: enabled && !!timePeriodLabel && !!entity,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default getFinancialReportsOptions;
