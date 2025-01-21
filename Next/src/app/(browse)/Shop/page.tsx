import ImageGallery from '@/components/BentoGrids/BentoGridProducts';
import { Filters } from '@/components/shared/filters';
import ShopProvider from '@/store/ShopProvider';
import React from 'react';

const Shop = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <ShopProvider>
            <div>
                <ImageGallery searchParams={searchParams} />
                <Filters />
            </div>
        </ShopProvider>
    );
};

export default Shop;