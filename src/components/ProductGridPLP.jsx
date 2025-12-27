import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductGridPLP = ({ products, onProductClick }) => {
    const [sortBy, setSortBy] = useState('best-match');

    const sortProducts = (products, sortType) => {
        const sorted = [...products];
        switch (sortType) {
            case 'price-low-high':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high-low':
                return sorted.sort((a, b) => b.price - a.price);
            case 'newest':
                return sorted.reverse();
            case 'best-match':
            default:
                return sorted;
        }
    };

    const sortedProducts = sortProducts(products, sortBy);

    return (
        <div className="flex-1">
            {/* Header with Sort and Count */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">All Products</h2>
                    <p className="text-sm text-gray-500">
                        {products.length} {products.length === 1 ? 'product' : 'products'} found
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                        Sort By:
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 focus:outline-none focus:border-accent cursor-pointer bg-white"
                    >
                        <option value="best-match">Best Match</option>
                        <option value="newest">Newest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Product Grid - 3 columns for better use of space */}
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => onProductClick && onProductClick(product)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
                </div>
            )}
        </div>
    );
};

export default ProductGridPLP;
