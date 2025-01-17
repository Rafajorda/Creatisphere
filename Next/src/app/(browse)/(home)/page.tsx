import ListProducts from '@/components/shared/Lists/ListProducts';
import ListCollections from '@/components/shared/Lists/ListCollections';
import ListSeries from '@/components/shared/Lists/ListSeries';
import React from 'react';

const Home = () => {
    return (
        <>
            <ListProducts />
            <ListCollections />
            <ListSeries />
        </>
    );
};

export default Home