import React, { useState } from 'react';

const ProductCard = ({ product, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="group cursor-pointer relative" 
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                <img
                    src={product.image || product.imageUrl}
                    alt={product.title || product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Quick Add Button */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <button className="w-full bg-white/95 backdrop-blur-sm text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300 shadow-lg">
                        Quick Add
                    </button>
                </div>

                {/* Rating Badge */}
                {product.rating && product.rating.rate >= 4 && (
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] uppercase tracking-wider font-bold flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{product.rating.rate.toFixed(1)}</span>
                    </div>
                )}
            </div>

            <div className="space-y-2 text-center group-hover:translate-y-[-4px] transition-transform duration-300">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-black/70 transition-colors line-clamp-2 min-h-[2.5rem]">
                    {product.title || product.name}
                </h3>
                
                {/* Rating Stars */}
                {product.rating && (
                    <div className="flex items-center justify-center gap-1 text-xs">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.round(product.rating.rate) ? 'text-yellow-500' : 'text-gray-300'}>
                                ★
                            </span>
                        ))}
                        <span className="text-gray-500 ml-1">({product.rating.count})</span>
                    </div>
                )}
                
                <div className="flex items-center justify-center gap-2">
                    <p className="text-sm font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
