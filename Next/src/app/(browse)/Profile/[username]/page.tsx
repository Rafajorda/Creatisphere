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
  const { username } = await params;
  const profile = await useGetProfile(username)
  return profile ? { title: profile.username } : {}
}


const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { username } = await params;
  const profile = await useGetProfile(username)

  if (!profile) {
    redirect('/404')
  }

  return (
    <div className="profile-page text-white text-xl container mx-auto">
      <ProfileInfo profile={profile} />
      <ProfileTabs profile={profile} />
    </div>
  )
}

export default ProfilePage
