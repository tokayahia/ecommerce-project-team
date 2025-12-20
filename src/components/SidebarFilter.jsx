import React, { useState } from 'react';

const SidebarFilter = ({ onFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });
    const [selectedSizes, setSelectedSizes] = useState([]);

    const categories = ['Tops', 'Bottoms', 'Accessories', 'Outerwear', 'Footwear'];
    const sizes = ['S', 'M', 'L', 'XL'];

    const handleCategoryChange = (category) => {
        const updated = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updated);
        onFilterChange?.({ categories: updated, priceRange, sizes: selectedSizes });
    };

    const handleSizeChange = (size) => {
        const updated = selectedSizes.includes(size)
            ? selectedSizes.filter(s => s !== size)
            : [...selectedSizes, size];
        setSelectedSizes(updated);
        onFilterChange?.({ categories: selectedCategories, priceRange, sizes: updated });
    };

    const handlePriceChange = (type, value) => {
        const updated = { ...priceRange, [type]: Number(value) };
        setPriceRange(updated);
        onFilterChange?.({ categories: selectedCategories, priceRange: updated, sizes: selectedSizes });
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange({ min: 0, max: 300 });
        setSelectedSizes([]);
        onFilterChange?.({ categories: [], priceRange: { min: 0, max: 300 }, sizes: [] });
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
                            <label key={category} className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="w-4 h-4 border-2 border-gray-300 rounded text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-black transition-colors">
                                    {category}
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-accent"
                                    placeholder="$0"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">Max</label>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-accent"
                                    placeholder="$300"
                                />
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="300"
                            value={priceRange.max}
                            onChange={(e) => handlePriceChange('max', e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>$0</span>
                            <span>$300+</span>
                        </div>
                    </div>
                </div>

                {/* Size Filter */}
                <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-900 mb-4">Size</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => handleSizeChange(size)}
                                className={`py-2 text-sm font-medium border-2 transition-all ${selectedSizes.includes(size)
                                        ? 'border-accent bg-accent text-white'
                                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilter;
