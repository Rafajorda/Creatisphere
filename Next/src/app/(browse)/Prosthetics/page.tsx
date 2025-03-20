import ImageGallery from '@/components/BentoGrids/BentoGridProsthetic';
import { Filters } from '@/components/shared/filters';
import InitializeFiltersShop from '@/components/shared/FiltersFetcher';
// import FiltersFetcher from '@/components/shared/FiltersFetcher';
import React from 'react';

const Shop = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <div>
            <ImageGallery searchParams={searchParams} />
            {/* <InitializeFiltersShop />
            <Filters /> */}
        </div>
    );
};

export default Shop;