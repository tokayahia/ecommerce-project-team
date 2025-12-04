const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = {
  getHeaders: () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  /**
   * Helper to handle fetch requests with timeout and better error handling
   */
  request: async (endpoint, options = {}, timeout = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const config = {
      ...options,
      headers: {
        ...api.getHeaders(),
        ...options.headers,
      },
      signal: controller.signal,
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      clearTimeout(id);

      if (!response.ok) {
        let errorMessage = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use default error message
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(id);

      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please check your internet connection or try again later.');
      }

      if (error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please ensure the backend is running and you have an active internet connection.');
      }

      throw error;
    }
  },

  // Products
  getProducts: async () => {
    return api.request('/products/', { method: 'GET' });
  },

  // Auth
  login: async ({ email, password }) => {
    // Note: We don't use api.request here because we need to set the token AFTER login
    const res = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }

    const data = await res.json();
    localStorage.setItem('token', data.access_token);
    return data;
  },

  register: async ({ email, password }) => {
    return api.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Cart (protected routes)
  getCart: async () => {
    return api.request('/cart/', { method: 'GET' });
  },

  addToCart: async ({ product_id, quantity = 1 }) => {
    return api.request('/cart/', {
      method: 'POST',
      body: JSON.stringify({ product_id, quantity }),
    });
  },

  removeFromCart: async (id) => {
    return api.request(`/cart/${id}/`, {
      method: 'DELETE',
    });
  },

  clearCart: async () => {
    return api.request('/cart/clear/', {
      method: 'POST',
    });
  },

  placeOrder: async () => {
    return api.request('/orders/', {
      method: 'POST',
    });
  },
};

export default api;