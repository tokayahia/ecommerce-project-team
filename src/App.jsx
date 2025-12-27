import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ROUTES } from './constants/routes';

// Layouts
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartCheckoutPage from './pages/CartCheckoutPage';
import AboutUsPage from './pages/AboutUsPage';
import AuthPage from './components/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Auth routes (no header/footer) */}
            <Route element={<AuthLayout />}>
              <Route path={ROUTES.LOGIN} element={<AuthPage initialMode="login" />} />
              <Route path={ROUTES.SIGNUP} element={<AuthPage initialMode="signup" />} />
            </Route>

            {/* Main routes (with header/footer) */}
            <Route element={<Layout />}>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.SHOP} element={<ProductListPage />} />
              <Route path={ROUTES.NEW_ARRIVALS} element={<ProductListPage filterType="new_arrivals" />} />
              <Route path={ROUTES.SALE} element={<ProductListPage filterType="sale" />} />
              <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
              <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
              
              {/* Protected routes */}
              <Route
                path={ROUTES.CART}
                element={
                  <ProtectedRoute>
                    <CartCheckoutPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;