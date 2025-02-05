import getCurrentUser from '@/actions/getCurrentUser';
import getPremiumPosts from '@/actions/getPremiumPosts';
import { CardPremiumPost } from '@/components/shared/Cards/CardPremiumPost';
import React from 'react';

const Premium = async () => {
    const currentUser = await getCurrentUser();
    const content = await getPremiumPosts();
    const isPremium = currentUser?.role === 'PREMIUM';

    return (
        <div className="container mx-auto p-4 my-10">
            <div className="space-y-8">
                {content.premiumPosts.map((item) => (
                    <CardPremiumPost key={item.id} item={item} isPremium={isPremium} />
                ))}
            </div>
        </div>
    );
};

export default Premium;