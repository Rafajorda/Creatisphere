import React from "react";
import { GalleryImage } from "@/components/BentoGrids/BentoGridProducts";
import Image from "next/image";
import Link from "next/link";

interface CardProductProps {
    product: GalleryImage;
}

export const CardProduct = ({ product }: CardProductProps) => {
    console.log(product.src);

    return (
        <div
            key={product.id}
            className={`relative overflow-hidden ${product.size === 'wide' ? 'col-span-2' : product.size === 'tall' ? 'row-span-2' : ''
                }`}
            style={{ height: product.size === 'wide' ? '100%' : 'auto' }}
        >
            <Link href={`/Details/${product.slug}`}>
                <div className="relative overflow-hidden group w-full h-full">
                    <Image
                        src={`/assets/products/${product.src}`}
                        alt={product.alt}
                        fill
                        sizes={
                            product.size === 'wide'
                                ? '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw'
                                : '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                        }
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-black text-3xl font-black">{product.name}</p>
                            <p className="text-black text-2xl font-bold">Collection: {product.collection}</p>
                            <p className="text-black text-2xl font-bold">Series: {product.series}</p>
                            <p className="text-black text-lg font-bold pt-5">Click for more info!</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

