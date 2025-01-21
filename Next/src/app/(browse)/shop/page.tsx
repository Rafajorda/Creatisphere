import ImageGallery from '@/components/BentoGrids/BentoGridProducts';
import React from 'react';

const Shop = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <div>
            <ImageGallery searchParams={searchParams} />
        </div>
    );
};

export default Shop;