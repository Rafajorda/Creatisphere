import { Metadata } from 'next'
import React from 'react'
import { useGetProfile } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { CartList } from '@/components/Cart/CartList'
import getCurrentUser from '@/actions/getCurrentUser'
import getUserProfile from '@/actions/getUserProfile'
import getCart from '@/actions/getCart'

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
  if (!profile) {
      redirect('/404')
  }
  const cart = await getCart(profile.id);
  console.log("profile");
  console.log(cart);

  return (
    <div className="profile-page text-white text-xl container mx-auto">
      <CartList cart={cart.cartLines} />
      {/* <CartTabs profile={cart} /> */}
    </div>
  )
}

  export default CartPage