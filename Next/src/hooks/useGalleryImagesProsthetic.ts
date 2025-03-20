import { getProductsProsthetics } from '@/actions/getProductsProsthetics';
import { role } from '@prisma/client';
import { status } from '@prisma/client';

// type status = 'active' | 'inactive'; // Define the status type

type User = {
    id: number;
    status: status;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    role: role;
};


export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    size: 'square' | 'wide' | 'tall';
    slug: string;
    name: string;
    fileSize: number;
    triangles: number;
    description: string;
    favorited: boolean;
    favoritedBy: User[];
    artist: {
        id: number;
    }
}

interface filters {
    category?: string[]
    fileSize?: number
    triangles?: number
    description?: string
    name?: string
    page?: number
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

export const useFetchGalleryImagesProsthetics = async (filters: filters): Promise<GalleryImage[]> => {
    const { products } = await getProductsProsthetics();
     console.log("products", products);
    const mappedImages = products.map(product => {
        const firstImage = product.ImagesProduct[0];
        return {
            id: firstImage.id,
            src: firstImage.src,
            alt: firstImage.alt,
            size: firstImage.size,
            slug: product.slug,
            name: product.name,
            fileSize: product.fileSize,
            triangles: product.triangles,
            description: product.description,
            favorited: product.favorited,
            favoritedBy: product.favoritedBy,
            artist: {
                id: product.artist.id,
            }
        };
    });



   
    

    return sortImages(mappedImages);
};
