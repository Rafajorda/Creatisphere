import React from 'react';
import { CardCategory } from '../Cards/CardCategory';
import getCategories from '@/actions/getCategories';

const ListCategories = async () => {
    const {categories} = await getCategories();

    return (
        <div>
            {categories.map((category) => (
                <CardCategory key={category.id} category={category} />
            ))}
        </div>
    );
};

export default ListCategories