'use client';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { fetchCollections, selectCollections } from '../../store/slices/collectionSlice';
import { fetchSeries, selectSeries } from '../../store/slices/seriesSlice';
import { fetchCategories, selectCategories } from '../../store/slices/categoriesSlice';

const InitializeFiltersShop = () => {
    const categories = useAppSelector(selectCategories);
    const series = useAppSelector(selectSeries);
    const collections = useAppSelector(selectCollections);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchCategories());
        }
        if (!series.length) {
            dispatch(fetchSeries());
        }
        if (!collections.length) {
            dispatch(fetchCollections());
        }
    }, [])

    return null;
}

export default InitializeFiltersShop;