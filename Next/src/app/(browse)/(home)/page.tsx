
import BentoGridCategories from '@/components/BentoGrids/BentoGridCategory';
import BentoGridCollection from '@/components/BentoGrids/BentoGridCollection';
import BentoGridSeries from '@/components/BentoGrids/BentoGridSeries';
import CarouselHome from '@/components/carousel/Carousel';
import React from 'react';

const Home = () => {
    return (
        <div className='bg-zinc-800'>
            <CarouselHome />
            <BentoGridCollection />
            <BentoGridSeries />
            <BentoGridCategories />
        </div>
    );
};

export default Home