import { UserWithRelations } from '@/types/UserWithRelations';
import { UserProfileResponse } from '@/types/UserProfile';

export function userMapper(user: UserWithRelations): UserProfileResponse {
  return {
    username: user.profile?.username || '',
    bio: user.profile?.bio || null,
    avatar: user.profile?.avatar || null,
    products: {
        products: user.products.map((product) => ({
            ...product,
            categories: product.categories,
            types: product.types,
            series: product.series,
            collections: product.collections,
            artist: user,
            ImagesProduct: product.ImagesProduct,
        })),
    },
    favorites: user.favorites.map((favorite) => ({
      product: {
        ...favorite.favoriting,
        categories: favorite.favoriting.categories,
        types: favorite.favoriting.types,
        series: favorite.favoriting.series,
        collections: favorite.favoriting.collections,
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
    })),
    followers: user.followers.map((follow) => ({
      id: follow.follower.id,  // Accedemos al 'follower' completo
      username: follow.follower.profile?.username || '',
      avatar: follow.follower.profile?.avatar || null,
      bio: follow.follower.profile?.bio || null,
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
        product: line.product,
      })),
    })),
    returns: user.returns.map((returns) => ({
      ...returns,
      returnsLine: returns.returnsLine.map((line) => ({
        ...line,
        product: line.product,
      })),
    })),
  };
}
