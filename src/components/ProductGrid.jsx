import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onProductClick }) => {
    return (
        <section className="max-w-[1280px] mx-auto px-6 pb-24">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                    View All
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => onProductClick(product)}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
