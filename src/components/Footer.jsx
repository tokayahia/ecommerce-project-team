import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h4 className="text-2xl font-serif font-bold tracking-tight">MODA CO.</h4>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Elevating everyday style with timeless essentials and modern design. Crafted for the contemporary individual.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Icons (Simplified for premium feel) */}
                            {['Instagram', 'Twitter', 'Facebook'].map(social => (
                                <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Shop</h5>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link to={ROUTES.SHOP} className="hover:text-black transition-colors">All Products</Link></li>
                            <li><Link to={ROUTES.NEW_ARRIVALS} className="hover:text-black transition-colors">New Arrivals</Link></li>
                            <li><Link to={ROUTES.SHOP} className="hover:text-black transition-colors">Best Sellers</Link></li>
                            <li><Link to={ROUTES.SALE} className="hover:text-black transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Company</h5>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link to={ROUTES.ABOUT} className="hover:text-black transition-colors">Our Story</Link></li>
                            <li><a href="#" className="hover:text-black transition-colors">Sustainability</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Press</a></li>
                        </ul>
                    </div>

                    {/* Newsletter (New addition for premium feel) */}
                    <div>
                        <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h5>
                        <p className="text-sm text-gray-500 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="flex border-b border-black pb-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-400"
                            />
                            <button className="text-xs font-bold uppercase tracking-widest hover:text-gray-600">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 uppercase tracking-wider">
                    <p>&copy; 2024 MODA CO. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


