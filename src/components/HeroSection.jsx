import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const HeroSection = () => {
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                    alt="Fashion Banner"
                    className="w-full h-full object-cover object-top animate-scale-in duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-6 h-full flex flex-col justify-center items-start">
                <div className="max-w-2xl space-y-8 pl-4 border-l-4 border-white/80 animate-slide-up">
                    <span className="text-white/80 uppercase tracking-[0.2em] text-sm font-medium block mb-2">
                        Spring / Summer Collection
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight font-serif tracking-tight">
                        Timeless Style<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                            Modern Living
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200 max-w-lg leading-relaxed font-light">
                        Discover our latest collection of premium essentials designed for those who appreciate detailed craftsmanship and everyday elegance.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link 
                            to={ROUTES.SHOP}
                            className="bg-white text-black px-10 py-4 text-sm font-bold tracking-widest hover:bg-neutral-200 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            SHOP COLLECTION
                        </Link>
                        <Link 
                            to={ROUTES.NEW_ARRIVALS}
                            className="border border-white text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
                        >
                            NEW ARRIVALS
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce text-white/50">
                <span className="text-xs tracking-widest mb-2">SCROLL</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
