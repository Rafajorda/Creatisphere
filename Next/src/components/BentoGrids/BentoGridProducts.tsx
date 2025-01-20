import React from 'react';
import { CardProduct } from '../shared/Cards/CardProduct';
import { useFetchGalleryImages } from '@/hooks/useGalleryImages';

const ImageGallery = async () => {
    const sortedImages = await useFetchGalleryImages();

    return (
        <div className="bg-gray-900 py-1">
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1"
                style={{
                    gridAutoRows: 'calc((100vw - 32px - 48px) / 5)',
                    gridAutoFlow: 'dense'
                }}
            >
                {sortedImages.map((product) => (
                    <CardProduct key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
