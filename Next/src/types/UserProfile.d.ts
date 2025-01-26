import { ProductResponse } from './Product';
import { FavoriteResponse } from './Favorites';
import { FollowResponse } from './Follows';
import { NotificationResponse } from './Notification';
import { CartResponse } from './Cart';
import { OrderResponse } from './Order';
import { ReturnResponse } from './Returns';

export interface UserProfileResponse {
  username: string;
  bio: string | null;
  avatar: string | null;
  products: ProductResponse;            // Lista de productos del usuario
  favorites: FavoriteResponse;          // Lista de favoritos
  following: FollowResponse['following']; // Usuarios que sigue
  followers: FollowResponse['followers']; // Usuarios que lo siguen
  notifications: NotificationResponse;  // Notificaciones del usuario
  cart: CartResponse[];                 // Carrito de compras
  orders: OrderResponse[];              // Pedidos realizados
  returns: ReturnResponse[];            // Devoluciones realizadas
}
