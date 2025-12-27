import React, { useState, useEffect } from 'react';
import SidebarFilter from './SidebarFilter';
import ProductGridPLP from './ProductGridPLP';

const ProductListPage = ({ allProducts, onNavigate, onProductClick, initialFilter, initialSearchQuery }) => {
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [filters, setFilters] = useState({
        categories: initialFilter ? [initialFilter] : [],
        priceRange: { min: 0, max: 1000 },
        sizes: []
    });

    useEffect(() => {
        if (initialFilter) {
            setFilters(prev => ({ ...prev, categories: [initialFilter] }));
        }
    }, [initialFilter]);

    useEffect(() => {
        applyFilters();
    }, [filters, allProducts, initialSearchQuery]);

    const applyFilters = () => {
        let filtered = [...allProducts];

        // Filter by categories
        if (filters.categories.length > 0) {
            filtered = filtered.filter(product =>
                filters.categories.some(cat =>
                    product.category.toLowerCase() === cat.toLowerCase()
                )
            );
        }

        // Filter by price range
        filtered = filtered.filter(product =>
            product.price >= filters.priceRange.min &&
            product.price <= filters.priceRange.max
        );

        // Note: Size filtering would require size data in products
        // For now, we'll keep all products if sizes are selected
        // In a real app, you'd filter by product.sizes array

        setFilteredProducts(filtered);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header / Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-[1280px] mx-auto px-6 py-8">
                    <nav className="text-sm text-gray-500 mb-2">
                        <a
                            onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }}
                            href="/"
                            className="hover:text-black transition-colors cursor-pointer"
                        >
                            Home
                        </a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Shop</span>
                    </nav>
                    <h1 className="text-3xl font-bold text-gray-900">Men's Collection</h1>
                    <p className="text-gray-600 mt-2">Discover our complete range of premium men's fashion</p>
                </div>
            </div>

            {/* Main Content: Sidebar + Product Grid */}
            <div className="max-w-[1280px] mx-auto px-6 py-12">
                <div className="flex gap-12">
                    {/* Sidebar - 1/5 width */}
                    <div className="w-1/5 min-w-[240px]">
                        <SidebarFilter onFilterChange={handleFilterChange} />
                    </div>

                    {/* Product Grid - 4/5 width */}
                    <div className="w-4/5">
                        <ProductGridPLP
                            products={filteredProducts}
                            onProductClick={onProductClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
