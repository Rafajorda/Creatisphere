import React from 'react'
import getCategories from '@/actions/getCategories';
import { CardCategories } from '../shared/Cards/CardCategory';

const BentoGridCategories = async () => {
    const categoriesList = await getCategories();

    const limitedCategoriesList = categoriesList.categories.slice(0, 6);

    return (
        <section className='bg-gradient-to-b from-transparent to-white/20'>
            <div className='container mx-auto text-shadow-lg'>
                <h1 className='text-5xl italic font-bold text-white'>Most popular Categories</h1>
                <div className="grid max-h-screen h-auto p-4 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-3 gap-5 mt-5">
                    {limitedCategoriesList.map((category, index) => (
                        <CardCategories key={category.id} category={category} ind={index} />
                    ))}
                </div >
            </div>
        </section>

    )
}

export default BentoGridCategories;