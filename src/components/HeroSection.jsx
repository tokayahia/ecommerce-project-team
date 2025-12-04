import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative w-full h-[600px] md:h-[700px] bg-gray-100 overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                alt="Fashion Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative max-w-[1280px] mx-auto px-6 h-full flex flex-col justify-center items-start">
                <div className="max-w-xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Timeless Style for the Modern Man
                    </h1>
                    <p className="text-lg text-white/90">
                        Discover our latest collection of premium essentials designed for everyday elegance.
                    </p>
                    <button className="bg-accent hover:bg-opacity-90 text-white px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300">
                        SHOP NEW ARRIVALS
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
