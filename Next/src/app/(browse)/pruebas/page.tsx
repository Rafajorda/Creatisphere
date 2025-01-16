import getCategories from '@/actions/getCategories';
import { CategoryItem} from '@/types/Category';
import React from 'react';

const ListProducts = async () => {
    const {categories} = await getCategories();

    console.log(categories);
    return (
        <h1>Hola hola</h1>
    );
};

export default ListProducts