import ImageGallery from '@/components/BentoGrids/BentoGridProducts';
import { Filters } from '@/components/shared/filters';
import React from 'react';

const Shop = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <div>
            <ImageGallery searchParams={searchParams} />
            <Filters />
        </div>
    );
};

export default Shop;