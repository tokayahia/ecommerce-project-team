import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { getProductRoute } from '../constants/routes';

const HomePage = () => {
    const { products, loading, error } = useProducts();
    const navigate = useNavigate();

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
        <>
            <HeroSection />
            <FeaturedCategories />
            <ProductGrid products={products} onProductClick={handleProductClick} />
        </>
    );
};

export default HomePage;
