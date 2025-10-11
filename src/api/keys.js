// Query keys for React Query
export const queryKeys = {
  // Products
  products: {
    all: ['products'],
    lists: () => [...queryKeys.products.all, 'list'],
    list: (filters = {}) => [...queryKeys.products.lists(), { filters }],
    details: () => [...queryKeys.products.all, 'detail'],
    detail: (id) => [...queryKeys.products.details(), id],
  },
  
  // Feature Flags
  featureFlags: {
    all: ['featureFlags'],
    lists: () => [...queryKeys.featureFlags.all, 'list'],
    list: (filters = {}) => [...queryKeys.featureFlags.lists(), { filters }],
    details: () => [...queryKeys.featureFlags.all, 'detail'],
    detail: (id) => [...queryKeys.featureFlags.details(), id],
  },
  
  // Users
  users: {
    all: ['users'],
    lists: () => [...queryKeys.users.all, 'list'],
    list: (filters = {}) => [...queryKeys.users.lists(), { filters }],
    details: () => [...queryKeys.users.all, 'detail'],
    detail: (id) => [...queryKeys.users.details(), id],
  },
  
  // Enums
  enums: {
    all: ['enums'],
    productStatus: () => [...queryKeys.enums.all, 'productStatus'],
  },
};

export default queryKeys;
