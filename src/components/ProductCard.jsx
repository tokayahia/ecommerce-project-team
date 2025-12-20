import React from 'react';

const ProductCard = ({ product, onClick }) => {
    return (
        <div className="group cursor-pointer" onClick={onClick}>
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Add to Cart Button */}
                <button className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-black hover:text-white">
                    ADD TO CART
                </button>
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
