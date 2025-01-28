import getUserProfile from '@/actions/getUserProfile'
import { Metadata } from 'next'
import { FavoriteItem } from '@/types/Favorite'
import { UserFollower } from '@/types/Follow'
import React from 'react'
import Link from 'next/link'

interface ProfilePageProps {
  params: { username: string }
}

async function getProfile(originUsername: string) {
  const username = decodeURIComponent(originUsername).replace(/@/, '')
  const profile = await getUserProfile(username)
  return profile
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {

  const profile = await getProfile(params.username)
  return profile ? { title: profile.username } : {}
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const profile = await getProfile(params?.username)
  console.log("Profile obtenida:", profile);
  if (!profile) {
    return null // Si no se encuentra el perfil, redirige
  }

  const username = profile.username
  const bio = profile.bio || 'No bio available' // Si no tiene bio, mostrar un texto por defecto.
  const products = profile.products.products || []
  console.log("Productos del perfil:", products);
  const favorites = profile.favorites || []
  const following = profile.following
  console.log("Siguiendo del perfil:", following);
  const followers = profile.followers
  console.log("Seguidores del perfil:", followers);
  const notifications = profile.notifications.notifications || []
  // Contadores de seguidores y seguidos
  const followersCount = profile.followers.length
  const followingCount = profile.following.length

  return (
    <div className="profile-page text-white text-xl container mx-auto">
      {/* Usuario Info */}
      <div className="user-info mt-5">
        <div>
          <div>
            <div>
              {/* Imagen de Usuario (Se omite si no es necesario, o puedes usar un avatar predeterminado) */}
              <img
                src={profile.avatar || '/default-avatar.png'}
                alt={profile.username}
                width={100}
                height={100}
              />
              <h4>{profile.username}</h4>
              <p>{bio}</p>

              {/* Botón de editar perfil o seguir */}
              <div>
                {profile.username === username ? (
                  <a href="/settings" className="btn">Editar perfil</a>
                ) : (
                  <button className="btn">Seguir</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="products-section mt-5">
        <h3>Productos del usuario</h3>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <div className="products-list">
            {products.map((product) => (
              <div key={product.id} className="product-item mt-3">
                {/* <img
                  src={product.ImagesProduct?.[0]?.src || '/default-product.png'}
                  alt={product.name}
                  width={100}
                  height={100}
                /> */}
                <h5>{product.name}</h5>
                <span>{product.price} USD</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Favoritos */}
      <div className="favorites-section mt-5">
        <h3>Favoritos</h3>
        {favorites.length === 0 ? (
          <p>No tienes productos favoritos.</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((favorite: FavoriteItem) => (
              <div key={favorite.product.id} className="favorite-item mt-3">
                {/* <img
                  src={favorite.product.ImagesProduct?.[0]?.src || '/default-product.png'}
                  alt={favorite.product.name}
                  width={100}
                  height={100}
                /> */}
                <h5>{favorite.product.name}</h5>
                <span>{favorite.product.price} USD</span>
                <p>Favorito desde: {new Date(favorite.favoritedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notificaciones */}
      <div className="notifications-section mt-5">
        <h3>Notificaciones</h3>
        {notifications.length === 0 ? (
          <p>No tienes notificaciones.</p>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                <p>{notification.message}</p>
                <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr />

      {/* Seguidores */}
      <div className="followers-section mt-5">
        <h3>Seguidores ({followersCount})</h3>
        {followers.length === 0 ? (
          <p>No tienes seguidores.</p>
        ) : (
          <div className="followers-list">
            {followers.map((follower: UserFollower) => (
              <div key={follower.id} className="follower-item mt-2">
                <img
                  src={follower.avatar || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                  alt={follower.username}
                  width={50}
                  height={50}
                />
                <h5>{follower.username}</h5>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seguidos */}
      <div className="following-section mt-5">
        <h3>Siguiendo ({followingCount})</h3>
        {following.length === 0 ? (
          <p>No sigues a nadie.</p>
        ) : (
          <div className="following-list">
            {following.map((follow: UserFollower) => (
              <Link
                key={follow.id}
                href={`/Profile/${follow.username}`}
              >
                <div key={follow.id} className="following-item">
                  <img
                    src={follow.avatar || '/default-avatar.png'}
                    alt={follow.username}
                    width={50}
                    height={50}
                  />
                  <h5>{follow.username}</h5>
                </div>
              </Link>

            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
