'use client';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { fetchCategories, selectCategories } from '../../store/slices/categoriesSlice';

const InitializeFiltersShop = () => {
    const categories = useAppSelector(selectCategories);
 
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchCategories());
        }
        // if (!series.length) {
        //     dispatch(fetchSeries());
        // }
        // if (!collections.length) {
        //     dispatch(fetchCollections());
        // }
    }, [])

    return null;
}

export default InitializeFiltersShop;