import React, { useState } from 'react';

const SidebarFilter = ({ onFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [minRating, setMinRating] = useState(0);

    // Real categories from the FakeStore API
    const categories = [
        { id: "men's clothing", label: "Men's Clothing" },
        { id: "women's clothing", label: "Women's Clothing" },
        { id: 'jewelery', label: 'Jewelry' },
        { id: 'electronics', label: 'Electronics' }
    ];

    const handleCategoryChange = (categoryId) => {
        const updated = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(c => c !== categoryId)
            : [...selectedCategories, categoryId];
        setSelectedCategories(updated);
        onFilterChange?.({ categories: updated, priceRange, minRating });
    };

    const handlePriceChange = (type, value) => {
        const updated = { ...priceRange, [type]: Number(value) };
        setPriceRange(updated);
        onFilterChange?.({ categories: selectedCategories, priceRange: updated, minRating });
    };

    const handleRatingChange = (rating) => {
        setMinRating(rating);
        onFilterChange?.({ categories: selectedCategories, priceRange, minRating: rating });
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange({ min: 0, max: 1000 });
        setMinRating(0);
        onFilterChange?.({ categories: [], priceRange: { min: 0, max: 1000 }, minRating: 0 });
    };

    return (
        <aside className="w-full bg-white border-r border-gray-200 pr-8">
            <div className="sticky top-24">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                    <button
                        onClick={clearFilters}
                        className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
                    >
                        Clear All
                    </button>
                </div>

                {/* Category Filter */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-900 mb-4">Category</h4>
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                    className="w-4 h-4 border-2 border-gray-300 rounded text-black focus:ring-black focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-black transition-colors">
                                    {category.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-900 mb-4">Price Range</h4>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">Min</label>
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={(e) => handlePriceChange('min', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                                    placeholder="$0"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">Max</label>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                                    placeholder="$1000"
                                />
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange.max}
                            onChange={(e) => handlePriceChange('max', e.target.value)}
                            className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-black"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>${priceRange.min}</span>
                            <span>${priceRange.max}</span>
                        </div>
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-900 mb-4">Minimum Rating</h4>
                    <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                            <label key={rating} className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={minRating === rating}
                                    onChange={() => handleRatingChange(rating)}
                                    className="w-4 h-4 border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="ml-3 flex items-center text-sm text-gray-700 group-hover:text-black transition-colors">
                                    {[...Array(rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-500">★</span>
                                    ))}
                                    <span className="ml-1">& up</span>
                                </span>
                            </label>
                        ))}
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="radio"
                                name="rating"
                                checked={minRating === 0}
                                onChange={() => handleRatingChange(0)}
                                className="w-4 h-4 border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="ml-3 text-sm text-gray-700 group-hover:text-black transition-colors">
                                All Ratings
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilter;
