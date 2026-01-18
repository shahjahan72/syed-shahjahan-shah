import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WhatWeCanDo from '../components/home/WhatWeCanDo';
import OurProcess from '../components/home/OurProcess';
import CategoriesGrid from '../components/home/CategoriesGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TrustBadges from '../components/home/TrustBadges';

const HomePage = () => {
    return (
        <div className="bg-brand-white">
            <HeroSection />
            <TrustBadges />
            <CategoriesGrid />
            <WhatWeCanDo />
            <FeaturedProducts />
            <OurProcess />
        </div>
    );
};

export default HomePage;
