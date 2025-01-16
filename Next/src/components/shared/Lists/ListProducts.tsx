import getProducts from '@/actions/getProducts';
import { ProductItem } from '@/types/Product';
import React from 'react';

const ListProducts = async () => {
    const {products} = await getProducts();

    return (
        <div className='text-center'>
            <div>
                {products.map((product: ProductItem) => (
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
                ))}
            </div>
        </div>
    );
};

export default ListProducts