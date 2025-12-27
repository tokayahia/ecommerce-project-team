import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SidebarFilter from '../components/SidebarFilter';
import ProductGridPLP from '../components/ProductGridPLP';
import { useProducts } from '../hooks/useProducts';
import { getProductRoute, ROUTES } from '../constants/routes';

const ProductListPage = ({ filterType = null }) => {
    const { products: allProducts, loading, error } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        categories: filterType ? [filterType] : [],
        priceRange: { min: 0, max: 1000 },
        minRating: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (filterType) {
            setFilters(prev => ({ ...prev, categories: [filterType] }));
        }
    }, [filterType]);

    useEffect(() => {
        applyFilters();
    }, [filters, allProducts]);

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

        // Filter by minimum rating
        if (filters.minRating > 0) {
            filtered = filtered.filter(product =>
                product.rating && product.rating.rate >= filters.minRating
            );
        }

        setFilteredProducts(filtered);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleProductClick = (product) => {
        navigate(getProductRoute(product.id));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header / Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-[1280px] mx-auto px-6 py-8">
                    <nav className="text-sm text-gray-500 mb-2">
                        <Link to={ROUTES.HOME} className="hover:text-black transition-colors">
                            Home
                        </Link>
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
                            onProductClick={handleProductClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
