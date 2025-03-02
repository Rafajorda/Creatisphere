import React, { Suspense } from 'react';
import { CardProduct } from '../shared/Cards/CardProduct';
import { useFetchGalleryImages } from '@/hooks/useGalleryImages';
import { SkeletonProduct } from '../shared/skeletons/skeletonProduct';

const ImageGallery = async ({ searchParams }: {
    searchParams?: {
        Category?: string[]
        fileSize?: string
        triangles?: number
        description?: string
        Name?: string
        Page?: number
    }
}) => {


    // const category = await searchParams?.category || '';
    const { Category, description, fileSize,triangles, Name, Page } = await searchParams;
    const filters = {
        categorySlugs: Category ? Category.split(',') : '', 
        searchQuery: Name || '',
        page: Page || 0,
    };

    const sortedImages = await useFetchGalleryImages(filters);

    return (
        <div className="bg-gray-900 py-1">
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1"
                style={{
                    gridAutoRows: 'calc((100vw - 32px - 48px) / 5)',
                    gridAutoFlow: 'dense'
                }}
            >
                {sortedImages.map((product) => (
                    <Suspense fallback={<SkeletonProduct />} key={product.id}>
                        <CardProduct product={product} key={product.id} />
                    </Suspense>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
