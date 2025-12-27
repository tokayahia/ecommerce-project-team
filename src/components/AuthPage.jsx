import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../constants/routes';

const AuthPage = ({ initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || ROUTES.HOME;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = () => {
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    // Password Validation
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    if (!isLogin) {
      // Name Validation
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        return 'Please enter your first and last name.';
      }

      // Password Match Validation
      if (formData.password !== formData.confirmPassword) {
        return 'Passwords do not match.';
      }
    }

    return null;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const validationError = validateForm();
    if (validationError && validationError !== 'Passwords do not match.' && validationError !== 'Please enter your first and last name.') {
       // Allow weaker login validation, but basic email/password check is good
       // Actually for login we mainly rely on backend, but email format is good to check.
       if (validationError.includes('email')) {
           setError(validationError);
           setLoading(false);
           return;
       }
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // Pass all relevant data to register, even if API currently only takes email/pass
      // This prepares the frontend for a more complete backend implementation
      await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName
      });
      setMessage('Account created successfully! Please log in.');
      setTimeout(() => {
        setIsLogin(true);
        setMessage('');
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchView = () => {
    setIsLogin(!isLogin);
    setError('');
    setMessage('');
    setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
       {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover opacity-20 scale-105 blur-sm"
            />
             <div className="absolute inset-0 bg-white/40"></div>
        </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-none shadow-2xl overflow-hidden max-w-lg w-full border border-white/50 animate-fade-in">
        <div className="p-10 md:p-12 relative">
           {/* Back Arrow */}
           <Link 
             to={ROUTES.HOME} 
             className="absolute top-8 left-8 text-gray-400 hover:text-black transition-colors"
             title="Back to Home"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
             </svg>
           </Link>

          {/* Header */}
          <div className="mb-10 text-center pt-4">
            <Link to={ROUTES.HOME} className="inline-block text-2xl font-serif font-bold tracking-tight text-gray-900 mb-6 hover:text-gray-700 transition-colors">
              MODA CO.
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-sm">
                 {isLogin ? 'Enter your details to access your account' : 'Start your journey with us properly'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                 <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-green-700">{message}</p>
                    </div>
                </div>
            </div>
          )}

          <form onSubmit={isLogin ? handleLoginSubmit : handleSignUpSubmit} className="space-y-5">
            {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-0 transition-colors"
                            placeholder="Jane"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-0 transition-colors"
                            placeholder="Doe"
                        />
                    </div>
                </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-0 transition-colors"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-0 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                        Confirm Password
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-0 transition-colors"
                        placeholder="••••••••"
                    />
                </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black hover:bg-gray-800 text-white font-bold uppercase tracking-widest py-4 text-xs transition-all duration-300 shadow-lg mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="text-center mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={switchView}
                className="text-black font-bold hover:underline ml-1"
                disabled={loading}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
