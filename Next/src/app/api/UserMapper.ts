import { UserWithRelations } from '@/types/UserWithRelations';
import { UserProfileResponse } from '@/types/UserProfile';
import { currentUser } from '@/types/CurrentUser';

// export function userMapper(user: UserWithRelations, isFollowing: boolean = false): UserProfileResponse {
export function userMapper(user: UserWithRelations, currentUser: currentUser): UserProfileResponse {
  const isCurrentUserFollowing = (userId: number): boolean => {
    return currentUser ? currentUser.following.some((f) => f.followingId === userId) : false
  }

  return {
    id: user.id,
    email: user.email,
    profile: user.profile,
    username: user.profile?.username || '',
    bio: user.profile?.bio || null,
    avatar: user.profile?.avatar || null,
    products: {
      products: user.products.map((product) => ({
        ...product,
        categories: product.categories,
        productPrices: product.productPrices,
        file: product.file,
        fileSize: product.fileSize,
        triangles: product.triangles,
        description: product.description,

        artist: user,
        ImagesProduct: product.ImagesProduct,
  
      })),
    },
    favorites: user.favorites.map((favorite) => ({
      product: {
        ...favorite.favoriting,
        categories: favorite.favoriting.categories,
        productPrices: favorite.favoriting.productPrices,
        artist: {
          id: favorite.favoriting.artist.id,
          username: favorite.favoriting.artist.profile?.username || '',
          bio: favorite.favoriting.artist.profile?.bio || null,
          avatar: favorite.favoriting.artist.profile?.avatar || null,
        },
        ImagesProduct: favorite.favoriting.ImagesProduct,
      },
      favoritedAt: favorite.createdAt,
    })),
    following: user.following.map((follow) => ({
      id: follow.following.id,  // Accedemos al 'following' completo
      username: follow.following.profile?.username || '',
      avatar: follow.following.profile?.avatar || null,
      bio: follow.following.profile?.bio || null,
      isFollowing: isCurrentUserFollowing(follow.following.id)
    })),
    followers: user.followers.map((follow) => ({
      id: follow.follower.id,  // Accedemos al 'follower' completo
      username: follow.follower.profile?.username || '',
      avatar: follow.follower.profile?.avatar || null,
      bio: follow.follower.profile?.bio || null,
      isFollowing: isCurrentUserFollowing(follow.follower.id)
    })),

    notifications: {
      notifications: user.notifications.map((notification) => ({
        id: notification.id,
        message: notification.message,
        userId: notification.userId,
        isRead: notification.isRead,
        notificationType: notification.notificationType,
        createdAt: notification.createdAt,
      })),
    },
    cart: user.Cart.map((cart) => ({
      ...cart,
      cartLines: cart.cartLines.map((line) => ({
        ...line,
        product: line.product,
      })),
    })),
    orders: user.Order.map((order) => ({
      ...order,
      orderLines: order.orderLines.map((line) => ({
        ...line,
        productPrice: line.productPrice,
      })),
    })),
    returns: user.returns.map((returns) => ({
      ...returns,
      returnsLine: returns.returnsLine.map((line) => ({
        ...line,
        product: line.product,
      })),
    })),

    // isFollowing: isFollowing
    isFollowing: currentUser ? user.followers.some((follow) => follow.follower.id === currentUser.id) : false,
  };
}
