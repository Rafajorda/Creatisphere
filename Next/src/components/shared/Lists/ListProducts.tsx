"use client"

import { useAppSelector } from '@/store/store';
import React from 'react';

const ListProducts = () => {
    const products = useAppSelector((state) => state.product.products);

    console.log(products);

    return (
        <div className='text-center'>
            <div>
                <h1>hola</h1>
                {/* {products.map((product: ProductItem) => (
                    <div key={product.id}>
                        <h2>Nombre: {product.name}</h2>
                        <p>Collection: {product.collections.name}</p>
                        <p>Series: {product.series.name}</p>
                        <div>
                            {product.categories.map((category) => (
                                <p key={category.id}>{category.name}</p>
                            ))}
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default ListProducts