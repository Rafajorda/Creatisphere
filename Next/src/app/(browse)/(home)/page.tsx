import ListProducts from '@/components/shared/Lists/ListProducts';
import ListCollections from '@/components/shared/Lists/ListCollections';
import React from 'react';

const Home = () => {
    return (
        <>
            <ListProducts />
            <ListCollections />
        </>
    );
};

export default Home