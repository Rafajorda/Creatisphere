import { SeriesItem } from "@/types/Series";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardSeriesProps {
    series: SeriesItem;
    ind: number;
}

export const CardSeries = ({ series, ind }: CardSeriesProps) => {
    return (
        <Link
            key={series.id}
            href={`/Shop?Series=${series.slug}`}
            className={`group relative flex overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] ${ind === 0
                ? 'md:col-span-2 md:row-span-4'
                : ind === 1
                    ? 'md:col-span-2 md:row-span-4'
                    : 'md:col-span-1 md:row-span-1 lg:row-span-2'
                }`}
        >
            <div key={series.id}>
                <Image
                    src={`/assets/series/${series.image}`}
                    alt={series.name}
                    fill
                    className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-80 object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="relative flex h-full w-full flex-col justify-end p-6 text-white text-shadow-xl">
                    <h2 className="mb-2 text-2xl font-bold text-shadow-xl">{series.name}</h2>
                </div>

            </div>
        </Link>
    );
}
