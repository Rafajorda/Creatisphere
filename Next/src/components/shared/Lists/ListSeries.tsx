import React from 'react';
import { CardSeries } from '../Cards/CardSeries';
import getSeries from '@/actions/getSeries';

const ListSeries = async () => {
    const series = await getSeries();
    const ListSeries = series.series;

    return (
        <div>
            {ListSeries.map((series) => (
                <CardSeries key={series.id} series={series} />
            ))}
        </div>
    );
};

export default ListSeries