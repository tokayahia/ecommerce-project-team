/**
 * Application route constants
 */
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  NEW_ARRIVALS: '/new-arrivals',
  SALE: '/sale',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
};

/**
 * Helper to generate product detail route
 */
export const getProductRoute = (productId) => `/product/${productId}`;
