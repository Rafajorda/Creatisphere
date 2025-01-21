'use client';

import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './store';
import React, { useEffect } from 'react';
import { fetchCollections, selectCollections } from './slices/collectionSlice';
import { fetchSeries, selectSeries } from './slices/seriesSlice';
import { fetchCategories, selectCategories } from './slices/categoriesSlice';

interface Props {
    children: React.ReactNode;
}

const InitializeStoreShop = () => {
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

const ShopProvider = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <InitializeStoreShop />
            {children}
        </Provider>
    );
};

export default ShopProvider;
