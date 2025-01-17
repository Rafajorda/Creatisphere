import React from 'react';
import { CardTypes } from '../Cards/CardTypes';
import getTypes from '@/actions/getTypes';

const ListTypes = async () => {
    const {types} = await getTypes();

    return (
        <div>
            {types.map((type) => (
                <CardTypes key={type.id} type={type} />
            ))}
        </div>
    );
};

export default ListTypes