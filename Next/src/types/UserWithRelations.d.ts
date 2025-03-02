import { User, Profile, Product, Favorite, Cart, Order, Returns, Notification, ProductPrice } from '@prisma/client';


type UserWithRelations = User & {
  profile: Profile | null;

  products: (Product & {
    categories: Category[];
    productPrices: ProductPrice[];
    ImagesProduct: ImagesProduct[];
    productPrices: ProductPrice[];
  })[];

  favorites: (Favorite & {
    favoriting: Product & {
      categories: Category[];
      productPrices: ProductPrice[];
      ImagesProduct: ImagesProduct[];
      artist: User & { profile: Profile | null };
    };
  })[];

  following: { following: User & { profile: Profile | null } }[]; // Aquí cambiamos el tipo para incluir al usuario seguido
  followers: { follower: User & { profile: Profile | null } }[];

  notifications: Notification[];

  Cart: (Cart & {
    cartLines: (CartLine & {
      product: Product;
    })[];
  })[];

  Order: (Order & {
    orderLines: (OrderLine & {
      product: Product;
    })[];
  })[];

  returns: (Returns & {
    returnsLine: (ReturnsLine & {
      product: Product;
    })[];
  })[];
};
