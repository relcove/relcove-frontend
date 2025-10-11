// Generic API utility for all services
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Generic API request handler with comprehensive error handling
export const apiRequest = async (endpoint, options = {}, getToken = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add Authorization header if token getter is provided
  if (getToken) {
    try {
      const token = await getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to get authentication token:', error);
    }
  }
  
  const config = {
    headers,
    ...options,
  };

  // Add body for non-GET requests
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Handle different status codes
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If response is not JSON, use the default error message
      }
      
      throw new Error(errorMessage);
    }

    // Handle empty responses (like DELETE)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }

    // Parse JSON response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return response;
  } catch (error) {
    // Network errors or other fetch errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server');
    }
    throw error;
  }
};

// Generic CRUD operations factory
export const createCrudApi = (baseEndpoint, getToken = null) => {
  // Ensure baseEndpoint doesn't end with slash to avoid double slashes
  const cleanBaseEndpoint = baseEndpoint.endsWith('/') ? baseEndpoint.slice(0, -1) : baseEndpoint;
  
  return {
    getAll: async () => {
      const response = await apiRequest(`${cleanBaseEndpoint}/`, {}, getToken);
      // Handle paginated response format: {products: [], total: 0, page: 1, page_size: 10}
      // or {users: [], total: 0, page: 1, page_size: 10}
      return response?.products || response?.users || response || [];
    },
    getById: (id) => apiRequest(`${cleanBaseEndpoint}/${id}`, {}, getToken),
    create: (data) => apiRequest(`${cleanBaseEndpoint}/`, {
      method: 'POST',
      body: data,
    }, getToken),
    update: (id, data) => apiRequest(`${cleanBaseEndpoint}/${id}`, {
      method: 'PUT',
      body: data,
    }, getToken),
    delete: (id) => apiRequest(`${cleanBaseEndpoint}/${id}`, {
      method: 'DELETE',
    }, getToken),
  };
};

export default apiRequest;
