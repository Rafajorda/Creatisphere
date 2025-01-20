
import BentoGridSeries from '@/components/BentoGrids/BentoGridCollections';
import CarouselHome from '@/components/carousel/Carousel';
import React from 'react';

const Home = () => {
    return (
        <div className='bg-zinc-800'>
            <CarouselHome />
            <BentoGridSeries />
        </div>
    );
};

export default Home