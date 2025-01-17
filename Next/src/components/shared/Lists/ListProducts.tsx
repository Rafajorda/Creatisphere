import React from 'react';
import { CardProduct } from '../Cards/CardProduct';
import getProducts from '@/actions/getProducts';

const ListProducts = async () => {
    const {products} = await getProducts();

    return (
        <div>
            {products.map((product) => (
                <CardProduct key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ListProducts