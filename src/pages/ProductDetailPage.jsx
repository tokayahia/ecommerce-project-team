import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../constants/routes';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { products, loading: productsLoading } = useProducts();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Navy');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (products.length > 0 && id) {
            const foundProduct = products.find(p => p.id === parseInt(id));
            setProduct(foundProduct);
        }
    }, [products, id]);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate(ROUTES.LOGIN, { state: { from: location } });
            return;
        }

        try {
            setAdding(true);
            await addToCart({ ...product, size: selectedSize, color: selectedColor, quantity });
            navigate(ROUTES.CART);
        } catch (error) {
            alert('Failed to add to cart: ' + (error.message || 'Unknown error'));
        } finally {
            setAdding(false);
        }
    };

    if (productsLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
                    <Link to={ROUTES.SHOP} className="text-accent hover:underline">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
            {/* Breadcrumbs */}
            <nav className="text-xs uppercase tracking-widest text-gray-500 mb-8 md:mb-12">
                <ol className="list-none p-0 inline-flex items-center">
                    <li className="flex items-center hover:text-black transition-colors">
                        <Link to={ROUTES.HOME}>Home</Link>
                        <span className="mx-3">/</span>
                    </li>
                    <li className="flex items-center hover:text-black transition-colors">
                        <Link to={ROUTES.SHOP}>{product.category}</Link>
                        <span className="mx-3">/</span>
                    </li>
                    <li>
                        <span className="text-black font-medium">{product.name}</span>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                {/* Left Column: Image Gallery (Sticky) */}
                <div className="space-y-4 md:sticky md:top-24 h-fit">
                    <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative group">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Right Column: Details & Info */}
                <div className="flex flex-col">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                        {product.name}
                    </h1>
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                        <p className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
                        
                        {/* Fake Reviews */}
                        <div className="flex items-center">
                            <div className="flex text-yellow-500 text-xs">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <span className="ml-2 text-xs text-gray-500 uppercase tracking-widest font-medium">4.8 (120)</span>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-10 leading-relaxed text-lg font-light">
                        {product.description || `Experience the perfect blend of style and comfort with our ${product.name}. Crafted from premium materials, this piece is designed to elevate your everyday wardrobe. Perfect for any occasion, it offers a modern fit that looks great on everyone.`}
                    </p>

                    {/* User Interaction Block */}
                    <div className="space-y-8">
                        {/* Size/Color Selectors Section */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['S', 'M', 'L', 'XL'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-10 h-10 flex items-center justify-center text-xs font-medium transition-all duration-200 ${selectedSize === size
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Color</h3>
                                <div className="flex items-center space-x-3">
                                    {[
                                        { name: 'Navy', class: 'bg-slate-800' },
                                        { name: 'Charcoal', class: 'bg-gray-600' },
                                        { name: 'Stone', class: 'bg-[#d6d3cd]' }
                                    ].map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-8 h-8 rounded-full focus:outline-none ring-offset-2 transition-all duration-200 ${color.class} ${selectedColor === color.name ? 'ring-1 ring-black scale-110' : 'hover:scale-105'
                                                }`}
                                            title={color.name}
                                            aria-label={`Select ${color.name} color`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Section */}
                        <div className="pt-8 border-t border-gray-100">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    {/* Quantity */}
                                    <div className="flex items-center border border-gray-200 w-max">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="p-4 text-gray-500 hover:text-black transition-colors"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            readOnly
                                            className="w-10 text-center text-gray-900 font-medium focus:outline-none bg-transparent"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="p-4 text-gray-500 hover:text-black transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={adding}
                                        className={`flex-1 bg-black hover:bg-gray-800 text-white py-4 px-8 text-sm font-bold tracking-widest transition-all duration-300 ${adding ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {adding ? 'ADDING...' : 'ADD TO CART'}
                                    </button>
                                </div>
                                <p className="text-center text-xs text-gray-500 mt-2">
                                    Free shipping on orders over $100. 30-day returns.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Information Tabs (Accordion Style for mobile friendliness, but kept tab-like for simplified look) */}
                    <div className="mt-16 border-t border-gray-100 pt-8">
                        <div className="flex space-x-8 mb-8 overflow-x-auto pb-2">
                            {['Details', 'Sizing', 'Shipping'].map((tab) => {
                                const tabKey = tab.toLowerCase();
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tabKey)}
                                        className={`text-xs font-bold uppercase tracking-widest pb-2 whitespace-nowrap transition-all relative ${activeTab === tabKey
                                            ? 'text-black'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {tab}
                                        {activeTab === tabKey && (
                                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        
                        <div className="prose prose-sm max-w-none text-gray-600 font-light">
                             {activeTab === 'details' && (
                                <ul className="space-y-4 list-none pl-0">
                                    <li className="flex items-start"><span className="mr-3 text-black">―</span> Premium cotton blend for superior breathability.</li>
                                    <li className="flex items-start"><span className="mr-3 text-black">―</span> Reinforced double-stitching at seams.</li>
                                    <li className="flex items-start"><span className="mr-3 text-black">―</span> Modern tailored fit.</li>
                                    <li className="flex items-start"><span className="mr-3 text-black">―</span> Pre-shrunk fabric.</li>
                                </ul>
                            )}
                            {activeTab === 'sizing' && (
                                <p>Fits true to size. We recommend taking your normal size for a standard fit, or sizing up for a more relaxed look. Model is 6'1" and wears a size M.</p>
                            )}
                            {activeTab === 'shipping' && (
                                <p>We offer free standard shipping on all orders over $100. For orders under $100, a flat rate of $9.95 applies. Orders are typically processed within 1-2 business days.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;

