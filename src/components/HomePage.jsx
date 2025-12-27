import React from 'react';
import HeroSection from './HeroSection';
import FeaturedCategories from './FeaturedCategories';
import ProductGrid from './ProductGrid';

const HomePage = ({ products, onProductClick, onNavigate }) => {
    return (
        <>
            <HeroSection />
            <FeaturedCategories onNavigate={onNavigate} />
            <ProductGrid products={products} onProductClick={onProductClick} />
        </>
    );
};

export default HomePage;
