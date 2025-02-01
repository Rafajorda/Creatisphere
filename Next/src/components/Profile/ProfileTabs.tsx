import { UserProfileResponse } from "@/types/UserProfile";
import React from "react";
import { Tabs } from "../ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ProfileProducts } from "./ProfileProducts";
import { ProfileFavorites } from "./ProfileFavorites";
import { ProfileFollow } from "./ProfileFollow";

interface ProfileTabsProps {
    profile: UserProfileResponse
}

export const ProfileTabs = ({ profile }: ProfileTabsProps) => {
    return (
        <>
            <Tabs defaultValue="products" className="w-full mt-6">

                <TabsList className={`grid w-full ${profile.products.products.length > 0 ? 'grid-cols-4' : 'grid-cols-3'}`}>

                    {profile.products.products.length > 0 && (
                        <TabsTrigger value="products">Products ({profile.products.products.length})</TabsTrigger>
                    )}

                    <TabsTrigger value="favorites">Favorites ({profile.favorites.length})</TabsTrigger>
                    <TabsTrigger value="following">Following ({profile.following.length})</TabsTrigger>
                    <TabsTrigger value="followers">Followers ({profile.followers.length})</TabsTrigger>
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
            </Tabs>
        </>
    )
}