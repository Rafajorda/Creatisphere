import { CollectionItem } from "@/types/Collection";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardCollectionProps {
    collection: CollectionItem;
    ind: number;
}

export const CardCollections = ({ collection, ind }: CardCollectionProps) => {
    return (
        <Link
            // key={collection.id}
            href={`/Shop?Collection=${collection.slug}`}
            className={`group relative flex overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] ${ind === 0
                ? 'md:col-span-2 md:row-span-2'
                : ind === 1
                    ? 'md:col-span-2 md:row-span-1'
                    : 'md:col-span-2 md:row-span-1 lg:row-span-1'
                }`}
        >
            <div className="relative w-full h-full">
                <Image
                    // src={`/assets/category/${category.image}`}
                    src={'https://picsum.photos/200'}
                    alt={collection.name}
                    fill
                    className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-80 object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="relative flex h-full w-full flex-col justify-end p-6 text-white text-shadow-xl">
                    <h2 className="mb-2 text-2xl font-bold text-shadow-xl">{collection.name}</h2>
                </div>

            </div>
        </Link>
    );
}
