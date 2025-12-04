import React from 'react';

const Header = ({ onNavigate, currentPage, user, onLogout, cartCount }) => {
    const handleNavigation = (page) => {
        if (onNavigate) {
            onNavigate(page);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={() => handleNavigation('home')}
                    className="text-2xl font-bold tracking-tight text-gray-900 cursor-pointer hover:text-accent transition-colors"
                >
                    MODA CO.
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <a
                        onClick={(e) => { e.preventDefault(); handleNavigation('shop'); }}
                        href="#"
                        className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                    >
                        Shop
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">New Arrivals</a>
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">Sale</a>
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">About Us</a>
                </nav>

                {/* Icons and Auth */}
                <div className="flex items-center space-x-6">
                    <button className="text-gray-700 hover:text-black transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleNavigation('cart')}
                        className="text-gray-700 hover:text-black transition-colors relative"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </div>
                                <span className="hidden lg:inline">
                                    {user.email ? `Hi, ${user.email.split('@')[0]}` : 'Account'}
                                </span>
                            </div>
                            <button
                                onClick={onLogout}
                                className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <a
                                onClick={(e) => { e.preventDefault(); handleNavigation('auth'); }}
                                href="#"
                                className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer"
                            >
                                Login
                            </a>
                            <button
                                onClick={() => handleNavigation('auth')}
                                className="bg-accent hover:bg-opacity-90 text-white px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
