'use client';

import { fetchProducts, selectProducts } from '@/store/slices/productSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import React, { useEffect } from 'react';
import { CardProduct } from '../Cards/CardProduct';

const ListProducts = () => {
    const products = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            {products.map((product) => (
                <CardProduct key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ListProducts