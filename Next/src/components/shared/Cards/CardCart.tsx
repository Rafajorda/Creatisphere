import type React from "react"
import Image from "next/image"
import Link from "next/link";
import { RemoveFromCartButton } from "@/components/Cart/RemoveFromCartButton";

interface CartItemProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any
}

export const CardCart = ({ item }: CartItemProps) => {
    console.log(item);
    const size = item.productPrice.product.ImagesProduct[0].size;

    return (
        <div className="grid grid-cols-3 gap-4 py-4 border-b border-gray-500">
            <div className="col-span-2 flex justify-center items-center">
                <div className={`relative ${size === "tall" ? "h-96 w-56" : "h-56 w-96"}`}>
                    <Link href={`/Details/${item.productPrice.product.slug}`}>
                        <Image
                            src={`/assets/products/${item.productPrice.product.userId}/${item.productPrice.product.ImagesProduct[0].src}`}
                            alt={item.productPrice.product.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-center text-end mr-3">
                <h2 className="text-xl text-gray-300">{item.types.name}</h2>
                <h2 className="text-2xl font-semibold text-white mb-5">{item.productPrice.product.name}</h2>
                <p className="text-xl text-gray-400">{item.productPrice.price.toFixed(2)}€</p>
                <RemoveFromCartButton productPriceId={item.productPrice.id} cartId={item.cartId} />
            </div>
        </div>
    )
}

