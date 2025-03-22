import { Metadata } from 'next'
import React from 'react'
import { useGetProfile } from '@/hooks/useAuth'
import { ProfileInfo } from '@/components/Profile/ProfileInfo'
import { ProfileTabs } from '@/components/Profile/ProfileTabs'
import { redirect } from 'next/navigation'

interface ProfilePageProps {
  params: { username: string }
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  console.log('generateMetadata params', params.username)
  const username  = await params.username;
  const profile = await useGetProfile(username)
  return profile ? { title: profile.username } : {}
}


const ProfilePage = async ({ params }: ProfilePageProps) => {
  console.log('ProfilePage params', params.username)
  const username = await params.username;
  const profile = await useGetProfile(username)
console.log('ProfilePage profile', profile)
    // if (!profile) {
    //   redirect('/404')
    // }

  return (
    <div className="profile-page text-white text-xl container mx-auto">
      <ProfileInfo profile={profile} />
      <ProfileTabs profile={profile} />
    </div>
  )
}

export default ProfilePage
