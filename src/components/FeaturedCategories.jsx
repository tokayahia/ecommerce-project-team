import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const categories = [
    {
        id: 1,
        name: "Tops",
        image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Bottoms",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Accessories",
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop"
    }
];

const FeaturedCategories = () => {
    const navigate = useNavigate();

    return (
        <section className="max-w-[1440px] mx-auto px-6 py-16 md:py-24">
             <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900">
                    Collections
                </h2>
                <button 
                    onClick={() => navigate(ROUTES.SHOP)}
                    className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                >
                    View All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group relative h-[500px] overflow-hidden cursor-pointer"
                        onClick={() => navigate(ROUTES.SHOP)}
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                        
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-3xl font-serif font-bold text-white mb-2 transform translate-y-0 transition-transform duration-300 group-hover:-translate-y-2">
                                {category.name}
                            </h3>
                            <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                Shop Now &rarr;
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategories;

