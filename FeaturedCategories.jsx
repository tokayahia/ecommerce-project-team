import React from 'react';

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

const FeaturedCategories = ({ onNavigate }) => {
    return (
        <section className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group relative h-[400px] overflow-hidden cursor-pointer"
                        onClick={() => onNavigate && onNavigate('shop', category.name.toLowerCase())}
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-widest border-b-2 border-transparent group-hover:border-white pb-1 transition-all">
                                {category.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategories;
