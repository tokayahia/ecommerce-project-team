const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = {
  getHeaders: () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  // Products
  getProducts: async () => {
    try {
      const url = `${API_URL}/products/`;
      const res = await fetch(url);
      console.log('✅ Response status:', res.status, res.statusText);
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
      const data = await res.json();
      console.log('📦 Products received:', data.length, 'items');
      return data;
    } catch (error) {
       console.error("❌ API Error:", error);
       throw error;
    }
  },

  // Auth
  login: async ({ email, password }) => {
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

  register: async ({ email, password, first_name, last_name }) => {
    // Note: Updated to include name fields if backend supports them in future
    const res = await fetch(`${API_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, first_name, last_name }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Registration failed');
    }
    return res.json();
  },

  // Cart (protected routes)
  getCart: async (user_id) => {
    // Some backends might need user_id as a query param if they don't extract from token
    const url = user_id ? `${API_URL}/cart/?user_id=${user_id}` : `${API_URL}/cart/`;
    const res = await fetch(url, {
      headers: api.getHeaders(),
    });
    console.log(`🛒 getCart (${url}) status:`, res.status);
    if (!res.ok) throw new Error('Failed to fetch cart');
    const data = await res.json();
    console.log('📦 getCart data received:', data);
    return data;
  },

  addToCart: async ({ product_id, quantity = 1, user_id }) => {
    console.log('🛒 addToCart Payload:', { product_id, quantity, user_id });
    const headers = api.getHeaders();
    
    const res = await fetch(`${API_URL}/cart/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ product_id, quantity, user_id }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ Failed to add to cart:', res.status, errorText);
        throw new Error(`Failed to add to cart: ${res.status} ${errorText}`);
    }
    
    const data = await res.json();
    console.log('✅ addToCart Server Response:', data);
    return data;
  },

  removeFromCart: async (id) => {
    const res = await fetch(`${API_URL}/cart/${id}/`, {
      method: 'DELETE',
      headers: api.getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to remove from cart');
    return res.json();
  },

  clearCart: async () => {
    const res = await fetch(`${API_URL}/cart/clear/`, {
      method: 'POST',
      headers: api.getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to clear cart');
    return res.json();
  },

  placeOrder: async () => {
    const res = await fetch(`${API_URL}/orders/`, {
      method: 'POST',
      headers: api.getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to place order');
    }
    return res.json();
  },
};

export default api;