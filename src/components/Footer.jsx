import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold">MODA CO.</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Elevating everyday style with timeless essentials and modern design.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="font-bold mb-4">Quick Links</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Shop All</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h5 className="font-bold mb-4">Company</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h5 className="font-bold mb-4">Legal</h5>
                        <ul className="space-y-2 text-sm text-gray-400 mb-6">
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                        </ul>
                        <div className="flex space-x-4">
                            {/* Social Placeholders */}
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors">
                                <span className="text-xs">IG</span>
                            </div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors">
                                <span className="text-xs">TW</span>
                            </div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors">
                                <span className="text-xs">FB</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2024 MODA CO. All rights reserved.</p>
                    <p>Designed for Modern Commerce.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
