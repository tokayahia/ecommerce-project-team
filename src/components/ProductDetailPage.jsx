import React, { useState } from 'react';

const ProductDetailPage = ({ product, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Navy');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');

    const [isAdding, setIsAdding] = useState(false);

    if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCartClick = async () => {
        if (!onAddToCart || isAdding) return;

        setIsAdding(true);
        try {
            await onAddToCart({ ...product, size: selectedSize, color: selectedColor, quantity });
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column: Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg overflow-hidden relative group">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                                <img
                                    src={product.imageUrl}
                                    alt={`View ${i}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Details & Info */}
                <div>
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-500 mb-6">
                        <ol className="list-none p-0 inline-flex items-center">
                            <li className="flex items-center">
                                <a href="#" className="hover:text-gray-900 transition-colors">Home</a>
                                <svg className="fill-current w-3 h-3 mx-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                            </li>
                            <li className="flex items-center">
                                <a href="#" className="hover:text-gray-900 capitalize transition-colors">{product.category}</a>
                                <svg className="fill-current w-3 h-3 mx-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                            </li>
                            <li>
                                <span className="text-gray-900 font-medium" aria-current="page">{product.name}</span>
                            </li>
                        </ol>
                    </nav>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{product.name}</h1>
                    <p className="text-2xl font-semibold text-accent mb-6">${product.price.toFixed(2)}</p>

                    {/* Reviews */}
                    <div className="flex items-center mb-8">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                            ))}
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">(45 Reviews)</span>
                    </div>

                    <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                        {product.description || `Experience the perfect blend of style and comfort with our ${product.name}. Crafted from premium materials, this piece is designed to elevate your everyday wardrobe. Perfect for any occasion, it offers a modern fit that looks great on everyone.`}
                    </p>

                    {/* User Interaction Block */}
                    <div className="space-y-8 border-t border-gray-100 pt-8">
                        {/* Size Selector */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                <button className="text-sm text-gray-500 underline hover:text-gray-900">Size Guide</button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`min-w-[3rem] h-12 px-4 flex items-center justify-center text-sm font-medium rounded-md border transition-all duration-200 ${selectedSize === size
                                            ? 'border-accent bg-accent text-white shadow-md'
                                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Swatches */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-4">Color</h3>
                            <div className="flex items-center space-x-4">
                                {[
                                    { name: 'Navy', class: 'bg-slate-800' },
                                    { name: 'Charcoal', class: 'bg-gray-600' },
                                    { name: 'Stone', class: 'bg-[#d6d3cd]' }
                                ].map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full focus:outline-none ring-offset-2 transition-all duration-200 ${color.class} ${selectedColor === color.name ? 'ring-2 ring-accent scale-110' : 'hover:scale-105'
                                            }`}
                                        title={color.name}
                                        aria-label={`Select ${color.name} color`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <div className="flex items-center border border-gray-300 rounded-md w-max">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="p-3 text-gray-600 hover:text-gray-900 transition-colors"
                                    aria-label="Decrease quantity"
                                    disabled={isAdding}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-12 text-center text-gray-900 font-medium focus:outline-none bg-transparent"
                                />
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="p-3 text-gray-600 hover:text-gray-900 transition-colors"
                                    aria-label="Increase quantity"
                                    disabled={isAdding}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCartClick}
                                disabled={isAdding}
                                className={`flex-1 bg-accent hover:bg-opacity-90 text-white py-4 px-8 rounded-md font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-lg ${isAdding ? 'opacity-70 cursor-wait' : ''
                                    }`}
                            >
                                {isAdding ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                )}
                                {isAdding ? 'ADDING...' : 'ADD TO CART'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Information Tabs */}
            <div className="mt-24">
                <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                    {['Details & Fabric', 'Sizing Guide', 'Shipping & Returns'].map((tab) => {
                        const tabKey = tab.toLowerCase().split(' ')[0];
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tabKey)}
                                className={`pb-4 px-8 text-sm font-semibold tracking-wide transition-colors relative whitespace-nowrap ${activeTab === tabKey
                                    ? 'text-accent'
                                    : 'text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                {tab.toUpperCase()}
                                {activeTab === tabKey && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"></span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="prose prose-lg max-w-none text-gray-600 animate-fadeIn">
                    {activeTab === 'details' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-gray-900 font-bold mb-4">Product Features</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        Premium cotton blend for superior breathability and comfort.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        Reinforced double-stitching at seams for enhanced durability.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        Modern tailored fit that flatters all body types.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        Pre-shrunk fabric to maintain shape after washing.
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold mb-4">Materials & Care</h3>
                                <p className="mb-4">
                                    Made from 100% organic cotton. This garment is ethically produced in Portugal.
                                </p>
                                <p>
                                    Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed.
                                </p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'sizing' && (
                        <div className="max-w-3xl">
                            <p className="mb-6">Fits true to size. We recommend taking your normal size for a standard fit, or sizing up for a more relaxed look.</p>
                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                <table className="min-w-full text-left text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold text-gray-900">Size</th>
                                            <th className="px-6 py-4 font-semibold text-gray-900">Chest (in)</th>
                                            <th className="px-6 py-4 font-semibold text-gray-900">Length (in)</th>
                                            <th className="px-6 py-4 font-semibold text-gray-900">Sleeve (in)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-gray-900">S</td>
                                            <td className="px-6 py-4">36-38</td>
                                            <td className="px-6 py-4">27</td>
                                            <td className="px-6 py-4">32.5</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-gray-900">M</td>
                                            <td className="px-6 py-4">38-40</td>
                                            <td className="px-6 py-4">28</td>
                                            <td className="px-6 py-4">33.5</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-gray-900">L</td>
                                            <td className="px-6 py-4">40-42</td>
                                            <td className="px-6 py-4">29</td>
                                            <td className="px-6 py-4">34.5</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-gray-900">XL</td>
                                            <td className="px-6 py-4">42-44</td>
                                            <td className="px-6 py-4">30</td>
                                            <td className="px-6 py-4">35.5</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-gray-900">XXL</td>
                                            <td className="px-6 py-4">44-46</td>
                                            <td className="px-6 py-4">31</td>
                                            <td className="px-6 py-4">36.5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 'shipping' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-gray-900 font-bold mb-4">Shipping Information</h3>
                                <p className="mb-4">
                                    We offer free standard shipping on all orders over $100. For orders under $100, a flat rate of $9.95 applies.
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li><strong>Standard Shipping:</strong> 3-5 business days</li>
                                    <li><strong>Express Shipping:</strong> 1-2 business days ($19.95)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold mb-4">Returns & Exchanges</h3>
                                <p className="mb-4">
                                    We want you to love your purchase. If you're not completely satisfied, we accept returns within 30 days of delivery.
                                </p>
                                <p className="text-sm">
                                    Items must be unworn, unwashed, and in their original packaging with all tags attached. Refunds are processed to the original payment method within 5-7 business days.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
