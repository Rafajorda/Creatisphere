'use client'

import type { UserProfileResponse } from "@/types/UserProfile"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { Download } from "lucide-react"
import React from "react"
import { useImageDownload } from "@/hooks/useImageDownload"

interface ProfileOrdersProps {
    profile: UserProfileResponse
}

export const ProfileOrders = ({ profile }: ProfileOrdersProps) => {
    const downloadImage = useImageDownload()

    return (
        <div className="max-w-3xl space-y-4 flex flex-col mx-auto">
            <h1 className="text-2xl font-bold">Orders for {profile.username}</h1>
                {profile.orders.map((order) => (
                    <React.Fragment key={order.id}>
                        {order.orderLines.map((line: any) => (
                            <div key={line.id} className="rounded-lg border p-4 bg-zinc-500">
                                <div className="relative">
                                    <Image
                                        src={`/assets/products/${line.productprice.product.userId}/${line.productprice.product.ImagesProduct[0].src}`}
                                        alt={line.productprice.product.ImagesProduct[0].alt}
                                        width={400}
                                        height={400}
                                        className="rounded-lg"
                                    />
                                    {line.productprice.type.name !== "Print" && (
                                        <button
                                            className="absolute top-2 right-2 p-2 bg-primary/40 text-primary-foreground rounded-full hover:bg-primary/20 transition-colors"
                                            onClick={() => {
                                                downloadImage(
                                                    `/assets/products/${line.productprice.product.userId}/${line.productprice.product.file}`,
                                                    line.productprice.product.name,
                                                );
                                            }}
                                            aria-label="Download image"
                                        >
                                            <Download size={24} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            
        </div>
    )
}

