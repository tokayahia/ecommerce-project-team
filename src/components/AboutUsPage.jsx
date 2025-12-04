import React from 'react';

const AboutUsPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative py-24 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Timeless Craftsmanship.
                    </h1>
                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                        Defining the modern man's essential wardrobe through quality, simplicity, and attention to detail.
                    </p>
                </div>
            </section>

            {/* Brand Philosophy */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Philosophy of MODA CO.</h2>
                    <div className="prose prose-lg mx-auto text-gray-600 space-y-6 leading-relaxed">
                        <p>
                            At MODA CO., we believe that style shouldn't be complicated. In a world of fast fashion and fleeting trends, we stand for something different: permanence. We design clothes that are meant to be worn, loved, and lived in for years, not just a season. Our philosophy is rooted in the belief that a few well-made pieces are worth more than a closet full of disposables.
                        </p>
                        <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 italic text-xl text-gray-800 bg-gray-50 pr-4 rounded-r-lg">
                            "True style is not about having the most clothes, but having the right clothes. It's about confidence in quality and the elegance of simplicity."
                        </blockquote>
                        <p>
                            We obsess over every stitch, button, and fabric choice. From the weight of our cotton to the cut of our denim, nothing is left to chance. We are dedicated to creating a wardrobe that empowers you to look your best without overthinking it, giving you the freedom to focus on what truly matters in your life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-6 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop"
                                alt="Tailor working on fabric"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </div>
                    <div className="order-1 md:order-2 md:pl-12">
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                MODA CO. began in a small studio in 2015 with a simple mission: to create the perfect white t-shirt. We were tired of shirts that lost their shape after a few washes or didn't fit quite right. What started as a passion project quickly grew into a full collection of menswear essentials.
                            </p>
                            <p>
                                Founded by four friends who shared a love for classic design and industrial craftsmanship, our journey has always been about stripping away the unnecessary. We traveled to Portugal, Japan, and Italy to find the best mills and factories, building relationships with artisans who share our values. Today, MODA CO. is more than just a brand; it's a community of individuals who appreciate the art of dressing well.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values / Commitment */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Our Commitment to Quality</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {/* Durability */}
                        <div className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 3h12l4 6-10 13L2 9Z" />
                                    <path d="M11 3 8 9l4 13 4-13-3-6" />
                                    <path d="M2 9h20" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Durability</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We design for longevity. Our garments are constructed to withstand the test of time, becoming better with every wear.
                            </p>
                        </div>

                        {/* Ethical Sourcing */}
                        <div className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z" />
                                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Ethical Sourcing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We partner with factories that prioritize fair wages and safe working conditions. We know exactly who makes our clothes.
                            </p>
                        </div>

                        {/* Sustainability */}
                        <div className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We are committed to reducing our footprint by using organic materials and minimizing waste in our production process.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
