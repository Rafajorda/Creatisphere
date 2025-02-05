import { PremiumPostItem } from "@/types/PremiumPost";
import { Lock } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

interface PremiumPostProps {
    item: PremiumPostItem;
    isPremium: boolean;
}

export const CardPremiumPost = ({ item, isPremium }: PremiumPostProps) => {
    return (
        <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-[400px]">
                {item.postType === "image" ? (
                    <Image src={item.src || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                ) : (
                    <video src={item.src} controls={isPremium} className="w-full h-full object-cover" />
                )}
                {!isPremium && (
                    <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center bg-black bg-opacity-30">
                        <Lock className="text-white w-16 h-16" />
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-2xl">{item.title}</h3>
                    <p className='text-zinc-400'>{item.createdAt.toLocaleDateString()}</p>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
            </div>
        </div>
    )
}