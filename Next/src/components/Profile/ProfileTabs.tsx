import { UserProfileResponse } from "@/types/UserProfile";
import React from "react";
import { Tabs } from "../ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ProfileProducts } from "./ProfileProducts";
import { ProfileFavorites } from "./ProfileFavorites";
import { ProfileFollow } from "./ProfileFollow";
import { ProfileOrders } from "./ProfileOrders";

interface ProfileTabsProps {
    profile: UserProfileResponse
}

export const ProfileTabs = ({ profile }: ProfileTabsProps) => {
    return (
        <Tabs defaultValue="products" className="w-full mt-10">

            <TabsList className={`grid w-full ${profile.products.products.length > 0 ? 'grid-cols-5' : 'grid-cols-4'}`}>

                {profile.products.products.length > 0 && (
                    <TabsTrigger value="products" className="my-5 py-1 rounded-l-xl font-bold bg-zinc-700 data-[state=active]:text-black data-[state=active]:bg-gold">
                        Products ({profile.products.products.length})
                    </TabsTrigger>
                )}

                <TabsTrigger value="favorites" className="my-5 py-1 font-bold bg-zinc-700 data-[state=active]:text-black data-[state=active]:bg-gold">
                    Favorites ({profile.favorites.length})
                </TabsTrigger>
                <TabsTrigger value="following" className="my-5 py-1 font-bold bg-zinc-700 data-[state=active]:text-black data-[state=active]:bg-gold">
                    Following ({profile.following.length})
                </TabsTrigger>
                <TabsTrigger value="followers" className="my-5 py-1 font-bold bg-zinc-700 data-[state=active]:text-black data-[state=active]:bg-gold">
                    Followers ({profile.followers.length})
                </TabsTrigger>
                <TabsTrigger value="orders" className="my-5 py-1 rounded-r-xl font-bold bg-zinc-700 data-[state=active]:text-black data-[state=active]:bg-gold">
                    Orders ({profile.orders.length})
                </TabsTrigger>
            </TabsList>

            {profile.products.products.length > 0 && (
                <TabsContent value="products">
                    <ProfileProducts profile={profile} />
                </TabsContent>
            )}

            <TabsContent value="favorites">
                <ProfileFavorites profile={profile} />
            </TabsContent>
            <TabsContent value="following">
                <ProfileFollow profile={profile} isFollower={false} />
            </TabsContent>
            <TabsContent value="followers">
                <ProfileFollow profile={profile} isFollower={true} />
            </TabsContent>
            <TabsContent value="orders">
                <ProfileOrders profile={profile} />
            </TabsContent>
        </Tabs>
    )
}