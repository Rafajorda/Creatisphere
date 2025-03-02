'use client';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { fetchCategories, selectCategories } from '../../store/slices/categoriesSlice';
import {fetchTypes , selectTypes} from '../../store/slices/typesSlice';

const InitializeParamsProduct = () => {
    const categories = useAppSelector(selectCategories);
    const types = useAppSelector(selectTypes);
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
        if (!types.length) {
            dispatch(fetchTypes());
        }
    }, [])

    return null;
}

export default InitializeParamsProduct;