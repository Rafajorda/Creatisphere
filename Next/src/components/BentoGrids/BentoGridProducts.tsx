import { CardProduct } from '../shared/Cards/CardProduct';
import getProducts from '@/actions/getProducts';
import React from 'react';

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    size: 'square' | 'wide' | 'tall';
    slug: string;
    name: string;
    collection: string;
    series: string
}

const sortImages = (images: GalleryImage[]): GalleryImage[] => {
    const grid: (GalleryImage | null)[][] = Array(4).fill(null).map(() => []);
    const columnHeights = [0, 0, 0, 0];
    const sizeOrder = { wide: 0, tall: 1, square: 2 };

    images
        .sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size])
        .forEach((image) => {
            const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));

            if (image.size === 'wide' && shortestCol < 3) {
                grid[shortestCol].push(image);
                grid[shortestCol + 1].push(null);
                columnHeights[shortestCol] += 1;
                columnHeights[shortestCol + 1] += 1;
            } else {
                grid[shortestCol].push(image);
                columnHeights[shortestCol] += image.size === 'tall' ? 2 : 1;
            }
        });

    return grid.flat().filter((img): img is GalleryImage => img !== null);
};

const ImageGallery = async () => {
    const { products } = await getProducts();

    const images = products.map(product => {
        const firstImage = product.ImagesProduct[0];
        return {
            id: firstImage.id,
            src: firstImage.src,
            alt: firstImage.alt,
            size: firstImage.size,
            slug: product.slug,
            name: product.name,
            collection: product.collections.name,
            series: product.series.name
        };
    });

    const sortedImages = sortImages(images);

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

