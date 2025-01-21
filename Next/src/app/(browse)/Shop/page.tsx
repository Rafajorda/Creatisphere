import ImageGallery from '@/components/BentoGrids/BentoGridProducts';
import { Filters } from '@/components/shared/filters';
import FiltersFetcher from '@/components/shared/FiltersFetcher';
import React from 'react';

const Shop = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <div>
            <ImageGallery searchParams={searchParams} />
            <FiltersFetcher />
            <Filters />
        </div>
    );
};

export default Shop;