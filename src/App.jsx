import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import HomePage from './components/HomePage.jsx';
import ProductListPage from './components/ProductListPage.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import CartCheckoutPage from './components/CartCheckoutPage.jsx';
import AboutUsPage from './components/AboutUsPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import Footer from './components/Footer.jsx';
import api from './services/api.js';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Auth state
  const [cartCount, setCartCount] = useState(0); // Cart badge
  const [notification, setNotification] = useState(null); // Toast state

  // Load user from token and fetch products
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.token) {
          setUser(parsedUser);
        } else {
          // Cleanup if data is corrupted
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (e) {
        console.error('Failed to parse saved user:', e);
        localStorage.removeItem('user');
      }
    } else {
      // Fallback for just token if exists (backwards compatibility or if set by api.js)
      const token = localStorage.getItem('token');
      if (token) {
        setUser({ token });
      }
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart count when user logs in and prevent auth access
  useEffect(() => {
    if (user) {
      const fetchCartCount = async () => {
        try {
          const cart = await api.getCart();
          setCartCount(cart.length);
        } catch (err) {
          console.error('Failed to fetch cart count:', err);
        }
      };
      fetchCartCount();

      // Redirect if on auth page
      if (currentPage === 'auth' || currentPage === 'login' || currentPage === 'signup') {
        setCurrentPage('home');
      }
    }
  }, [user, currentPage]);

  const handleNavigation = (page, category = null, query = null, userData = null) => {
    if (userData) {
      const newUser = {
        token: userData.access_token,
        email: userData.user?.email || userData.email || null // Handle various response formats
      };
      setUser(newUser);
      localStorage.setItem('token', userData.access_token);
      localStorage.setItem('user', JSON.stringify(newUser));
    }

    // Redirect away from auth pages if already logged in
    if (user && (page === 'auth' || page === 'login' || page === 'signup')) {
      setCurrentPage('home');
      return;
    }

    if (page === 'cart' && !user && !userData) {
      alert('Please log in to view your cart');
      setCurrentPage('login');
      return;
    }

    setCurrentPage(page);
    setCategoryFilter(category);
    setSearchTerm(query);
    window.scrollTo(0, 0);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      showNotification('Please log in to add items to your cart', 'error');
      handleNavigation('auth');
      return;
    }

    try {
      // Optimistic behavior: We could update count here, but let's wait for API to be sure
      await api.addToCart({
        product_id: product.id,
        quantity: product.quantity || 1
      });

      // Refresh cart count from server
      const cart = await api.getCart();
      setCartCount(cart.length);

      showNotification(`${product.name} added to cart!`, 'success');
      // No longer redirecting automatically to cart, let user decide
    } catch (err) {
      console.error('Add to cart error:', err);
      const isNetworkError = err.message.includes('Unable to connect') || err.message.includes('timed out');
      const userMessage = isNetworkError
        ? `${err.message} Please check your connection and click to retry.`
        : `Could not add to cart: ${err.message}`;

      showNotification(userMessage, 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
    handleNavigation('home');
  };

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[50vh] text-red-600">
          <p>{error}</p>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={products}
            onProductClick={(product) => {
              setSelectedProduct(product);
              handleNavigation('product_detail');
            }}
            onNavigate={handleNavigation}
          />
        );
      case 'shop':
      case 'new_arrivals':
      case 'sale':
        return (
          <ProductListPage
            allProducts={products}
            onNavigate={handleNavigation}
            onProductClick={(product) => {
              setSelectedProduct(product);
              handleNavigation('product_detail');
            }}
            initialFilter={categoryFilter}
            initialSearchQuery={searchTerm}
          />
        );
      case 'product_detail':
        return (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cart':
        return <CartCheckoutPage onNavigate={handleNavigation} onCartChange={setCartCount} />;
      case 'about_us':
        return <AboutUsPage />;
      case 'login':
      case 'signup':
      case 'auth':
        return <AuthPage onNavigate={handleNavigation} initialMode={currentPage === 'signup' ? 'signup' : 'login'} />;
      default:
        return (
          <HomePage
            products={products}
            onProductClick={(product) => {
              setSelectedProduct(product);
              handleNavigation('product_detail');
            }}
            onNavigate={handleNavigation}
          />
        );
    }
  };

  // Full-screen auth pages (no header/footer)
  if (currentPage === 'auth' || currentPage === 'login' || currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header
        onNavigate={handleNavigation}
        currentPage={currentPage}
        user={user}
        onLogout={handleLogout}
        cartCount={cartCount}
      />

      <main className="pt-20">
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigation} />

      {/* Toast Notification Component */}
      {notification && (
        <div className={`fixed bottom-8 right-8 z-[100] max-w-md animate-slide-up`}>
          <div className={`px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-4 border ${notification.type === 'success'
              ? 'bg-green-50 border-green-100 text-green-800'
              : 'bg-red-50 border-red-100 text-red-800'
            }`}>
            {notification.type === 'success' ? (
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <div className="flex-1">
              <p className="text-sm font-semibold">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;