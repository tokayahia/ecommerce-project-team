import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ROUTES } from '../constants/routes';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const { cartCount } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Check for scroll to add background to header
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if we are on the home page (for transparent header potential)
    const isHome = location.pathname === ROUTES.HOME;

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
                scrolled 
                    ? 'bg-white/95 backdrop-blur-md border-gray-100 py-4 shadow-sm' 
                    : 'bg-white border-transparent py-6'
            }`}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to={ROUTES.HOME}
                    className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 cursor-pointer font-serif relative group"
                >
                    MODA CO.
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-12">
                    {[
                        { name: 'Shop', path: ROUTES.SHOP },
                        { name: 'New Arrivals', path: ROUTES.NEW_ARRIVALS },
                        { name: 'Sale', path: ROUTES.SALE },
                        { name: 'About Us', path: ROUTES.ABOUT }
                    ].map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:text-black relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full ${
                                    isActive ? 'text-black after:w-full' : 'text-gray-500'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Icons and Auth */}
                <div className="flex items-center space-x-6 md:space-x-8">
                    <button className="text-gray-900 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    
                    <Link to={ROUTES.CART} className="text-gray-900 hover:text-gray-600 transition-colors relative group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-scale-in">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    
                    {isAuthenticated ? (
                        <button
                            onClick={logout}
                            className="text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-gray-600 transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to={ROUTES.LOGIN}
                            className="text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-gray-600 transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

