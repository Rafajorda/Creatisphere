import { SeriesItem } from "@/types/Series";
import React from "react";

interface CardSeriesProps {
    series: SeriesItem;
}

export const CardSeries = ({ series }: CardSeriesProps) => {
    return (
        <div className="card">
            <h1>{series.name}</h1>
            <img src={series.image ?? ''} alt={series.name} />
        </div>
    );
}

