import { Metadata } from 'next'
import React from 'react'
import { useGetProfile } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { CartList } from '@/components/Cart/CartList'
import getCurrentUser from '@/actions/getCurrentUser'
import getUserProfile from '@/actions/getUserProfile'

interface CartPageProps {
  params: { username: string }
}

export async function generateMetadata({
  params,
}: CartPageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await useGetProfile(username)
  return profile ? { title: profile.username } : {}
}


const CartPage = async ({ params }: CartPageProps) => {
  const profile = await getCurrentUser();
  console.log("profile");
  console.log(profile);
  if (!profile) {
      redirect('/404')
  }

  return (
    <div className="profile-page text-white text-xl container mx-auto">
      <CartList profile={profile} />
      {/* <CartTabs profile={cart} /> */}
    </div>
  )
}

  export default CartPage