import { ProductItem } from './Product';

export interface FavoriteItem {
  product: ProductItem;
  favoritedAt: Date; 
}

export interface FavoriteResponse {
  favorites: FavoriteItem[];
}
