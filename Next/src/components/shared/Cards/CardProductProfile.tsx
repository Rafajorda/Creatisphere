import Image from "next/image"
import Link from "next/link"
import type { ProductItem } from "@/types/Product"
import React from "react"

interface CardProductProps {
    product: ProductItem
}

export const CardProductProfile = ({ product }: CardProductProps) => {
    return (
        <div
            key={product.id}
            className={`group relative overflow-hidden ${product.size === "wide" ? "col-span-2" : product.size === "tall" ? "row-span-2" : ""
                }`}
        >
            <Link href={`/Details/${product.slug}`}>
                <div className="relative w-full h-64">
                    <Image
                        src={`/assets/products/${product.ImagesProduct[0].src}`}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-white bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center p-2 font-serif text-shadow-md">
                        <p className="text-black text-base sm:text-xl md:text-2xl lg:text-4xl font-bold italic">{product.name}</p>
                        <p className="text-black text-xs sm:text-sm md:text-base lg:text-2xl italic">
                            <span className="font-extrabold">Collection: </span>
                            {product.collections.name}
                        </p>
                        <p className="text-black text-xs sm:text-sm md:text-base lg:text-2xl italic">
                            <span className="font-extrabold">Series: </span>
                            {product.series.name}
                        </p>
                        <p className="text-black text-xs sm:text-sm md:text-base lg:text-lg font-bold pt-1 sm:pt-2 md:pt-3 lg:pt-5">
                            Click for more info!
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

