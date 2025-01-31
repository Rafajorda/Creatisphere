import { Metadata } from 'next'
import React from 'react'
import { useGetProfile } from '@/hooks/useAuth'
import { ProfileInfo } from '@/components/Profile/ProfileInfo'
import { ProfileFollow } from '@/components/Profile/ProfileFollow'
import { ProfileFavorites } from '@/components/Profile/ProfileFavorites'
import { ProfileProducts } from '@/components/Profile/ProfileProducts'
import { EditProfileButton } from '@/components/shared/buttons/EditProfileButton'
import getCurrentUser from '@/actions/getCurrentUser'

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
  const currentUser = await getCurrentUser()
  const { username } = await params;
  const profile = await useGetProfile(username)

  const isCurrentUser = currentUser?.username === profile?.username

  if (!profile) {
    return null // Si no se encuentra el perfil, redirige
  }

  return (
    <div className="profile-page text-white text-xl container mx-auto">
      <ProfileInfo profile={profile} />

      {isCurrentUser && (
        <EditProfileButton />
      )}

      <ProfileProducts profile={profile} />
      <ProfileFavorites profile={profile} />
      <ProfileFollow profile={profile} isFollower={false} /> {/* Following */}
      <ProfileFollow profile={profile} isFollower={true} /> {/* Followers */}
    </div>
  )
}

export default ProfilePage
