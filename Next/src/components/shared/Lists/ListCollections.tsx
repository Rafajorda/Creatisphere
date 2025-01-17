import React from 'react';
import { CardCollection } from '../Cards/CardCollection';
import getCollections from '@/actions/getCollections';

const ListCollections = async () => {
    const {collections} = await getCollections();

    return (
        <div>
            {collections.map((collection) => (
                <CardCollection key={collection.id} collection={collection} />
            ))}
        </div>
    );
};

export default ListCollections