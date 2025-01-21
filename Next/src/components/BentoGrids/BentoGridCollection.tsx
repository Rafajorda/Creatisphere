import React from 'react'
import getCollections from '@/actions/getCollections';
import { CardCollections } from '../shared/Cards/CardCollection';

const BentoGridCollection = async () => {
    const collectionList = await getCollections();

    const limitedCollectionsList = collectionList.collections.slice(0, 3);

    return (
        <section className='bg-gradient-to-b from-black/80 to-transparent'>
            <div className='container mx-auto text-shadow-lg'>
                <h1 className='text-5xl italic font-bold text-white text-end'>Newest Collections!</h1>
                <div className="grid max-h-screen h-auto p-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-5 mt-5">
                    {limitedCollectionsList.map((collection, index) => (
                        <CardCollections key={collection.id} collection={collection} ind={index} />
                    ))}
                </div >
            </div>
        </section>

    )
}

export default BentoGridCollection;