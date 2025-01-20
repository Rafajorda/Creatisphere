require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.favorites.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.follows.deleteMany();
  await prisma.orderLine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.imagesProduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.series.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.carousel.deleteMany();
  await prisma.type.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.token.deleteMany();
  await prisma.blacklist.deleteMany();
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Collection" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Series" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Favorites" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Notification" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Follows" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "OrderLine" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "ImagesProduct" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Profile" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Carousel" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Type" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Token" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Blacklist" RESTART IDENTITY CASCADE;');
}

async function main() {
  await clearDatabase();
  // Crear usuarios
  const users = await prisma.user.createMany({
    data: [
      { email: 'artist1@example.com', password: 'password123', role: 'CREATOR', accessToken: 'token1' },
      { email: 'artist2@example.com', password: 'password123', role: 'CREATOR', accessToken: 'token2' },
      { email: 'user1@example.com', password: 'password123', role: 'USER', accessToken: 'token3' },
      { email: 'user2@example.com', password: 'password123', role: 'USER', accessToken: 'token4' },
      { email: 'admin@example.com', password: 'adminpassword', role: 'ADMIN', accessToken: 'token5' },
    ],
  });

  console.log('Usuarios creados:', users);

  // Crear categorías
  const categories = [];
  categories.push(await prisma.category.create({
    data: { name: 'Digital Paintings', slug: 'digital-paintings', image: 'https://via.placeholder.com/300' },
  }));
  categories.push(await prisma.category.create({
    data: { name: '3D Models', slug: '3d-models', image: 'https://via.placeholder.com/300' },
  }));
  categories.push(await prisma.category.create({
    data: { name: 'Illustrations', slug: 'illustrations', image: 'https://via.placeholder.com/300' },
  }));
  categories.push(await prisma.category.create({
    data: { name: 'Photography', slug: 'photography', image: 'https://via.placeholder.com/300' },
  }));
  categories.push(await prisma.category.create({
    data: { name: 'Animations', slug: 'animations', image: 'https://via.placeholder.com/300' },
  }));

  console.log('Categorías creadas:', categories);

  // Crear tipos de producto
  const types = [];
  types.push(await prisma.type.create({
    data: { name: 'Art Prints', slug: 'art-prints', image: 'https://via.placeholder.com/300' },
  }));
  types.push(await prisma.type.create({
    data: { name: 'Digital', slug: 'digital', image: 'https://via.placeholder.com/300' },
  }));
  types.push(await prisma.type.create({
    data: { name: '3D', slug: '3d', image: 'https://via.placeholder.com/300' },
  }));
  types.push(await prisma.type.create({
    data: { name: 'Limited Edition', slug: 'limited-edition', image: 'https://via.placeholder.com/300' },
  }));

  console.log('Tipos de producto creados:', types);

  // Crear colecciones
  const collections = [];
  collections.push(await prisma.collection.create({
    data: { name: 'Reminiscence', slug: 'Reminiscence', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Tarot', slug: 'Tarot', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Bubbly colors', slug: 'Bubbly-colors', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Travel around Japan', slug: 'Travel-around-Japan', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Cozy', slug: 'Cozy', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Dragon Dance', slug: 'Dragon-Dance', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Cosmos', slug: 'Cosmos', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'K-pop', slug: 'K-pop', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Reto Loulogio', slug: 'Reto-Loulogio', image: 'https://via.placeholder.com/300' },
  }));

  console.log('Colecciones creadas:', collections);

  // Crear series
  const series = [];
  series.push(await prisma.series.create({
    data: { name: 'Pokemon', slug: 'pokemon', image: 'col_pokemon.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'LoL', slug: 'lol', image: 'col_lol.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Genshin', slug: 'genshin', image: 'col_genshin.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'GoT', slug: 'got', image: 'col_got.png' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Dungeons & Dragons', slug: 'dungeons-&-dragons', image: 'col_dnd.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Marvel', slug: 'marvel', image: 'col_marvel.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Honkai Star Rail', slug: 'honkai-star-rail', image: 'col_honkai.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Final Fantasy XIV', slug: 'final-fantasy-xiv', image: 'col_ffxiv.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Hololive', slug: 'hololive', image: 'col_hololive.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'No series', slug: 'no-series', image: null },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Hyouka', slug: 'hyouka', image: null },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Avatar (ATLA)', slug: 'avatar-(atla)', image: null },
  }));

  console.log('Series creadas:', series);

  // Crear productos con relaciones
  const products = [];
  products.push(await prisma.product.create({
    data: {
      name: 'Aomori Fauna',
      slug: 'Aomori-Fauna',
      price: 29.99,
      stock: 10,
      userId: 1,
      collectionId: 4,
      seriesId: 9,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Signal Sky',
      slug: 'Signal-Sky',
      price: 24.99,
      stock: 5,
      userId: 2,
      collectionId: 4,
      seriesId: 1,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Endwalker',
      slug: 'Endwalker',
      price: 19.99,
      stock: 15,
      userId: 1,
      collectionId: 1,
      seriesId: 8,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'iRys',
      slug: 'iRys',
      price: 29.99,
      stock: 8,
      userId: 2,
      collectionId: 1,
      seriesId: 9,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Sana',
      slug: 'Sana',
      price: 19.99,
      stock: 12,
      userId: 1,
      collectionId: 3,
      seriesId: 9,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Puerto al alba',
      slug: 'Puerto-al-alba',
      price: 29.99,
      stock: 10,
      userId: 2,
      collectionId: 5,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Puerto al ocaso',
      slug: 'Puerto-al-ocaso',
      price: 19.99,
      stock: 5,
      userId: 1,
      collectionId: 5,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Cafe Hyouka',
      slug: 'Cafe-Hyouka',
      price: 19.99,
      stock: 15,
      userId: 2,
      collectionId: 1,
      seriesId: 11,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Cage interpretation',
      slug: 'Cage-interpretation',
      price: 19.99,
      stock: 8,
      userId: 1,
      collectionId: 9,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Dragon dance - Zuko',
      slug: 'Dragon-dance-Zuko',
      price: 19.99,
      stock: 12,
      userId: 2,
      collectionId: 6,
      seriesId: 12,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Dragon dance - Aang',
      slug: 'Dragon-dance-Aang',
      price: 19.99,
      stock: 10,
      userId: 1,
      collectionId: 6,
      seriesId: 12,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Pokemon Galicia',
      slug: 'Pokemon-Galicia',
      price: 19.99,
      stock: 15,
      userId: 2,
      collectionId: 9,
      seriesId: 1,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Temple Yue',
      slug: 'Temple-Yue',
      price: 19.99,
      stock: 8,
      userId: 1,
      collectionId: 1,
      seriesId: 5,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Moonholder Yue',
      slug: 'Moonholder-Yue',
      price: 19.99,
      stock: 12,
      userId: 2,
      collectionId: 7,
      seriesId: 5,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Agni kai',
      slug: 'Agni-kai',
      price: 19.99,
      stock: 10,
      userId: 1,
      collectionId: 6,
      seriesId: 12,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Hoenn',
      slug: 'Hoenn',
      price: 19.99,
      stock: 15,
      userId: 2,
      collectionId: 5,
      seriesId: 1,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Hyouka finale',
      slug: 'Hyouka-finale',
      price: 19.99,
      stock: 8,
      userId: 1,
      collectionId: 1,
      seriesId: 11,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Starry night',
      slug: 'Starry-night',
      price: 19.99,
      stock: 12,
      userId: 2,
      collectionId: 7,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Heize',
      slug: 'Heize',
      price: 19.99,
      stock: 10,
      userId: 1,
      collectionId: 8,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Kokomi',
      slug: 'Kokomi',
      price: 29.99,
      stock: 15,
      userId: 2,
      collectionId: 2,
      seriesId: 3,
    },
  }));

  console.log('Productos creados:', products);

  /**
   * CREAR LOS DUMMIES DE LAS TABLAS PIVOT
   */

  await prisma.product.update({
    where: { id: products[0].id },
    data: {
      categories: {
        connect: [
          { id: categories[1].id },
          { id: categories[2].id },
        ]
      },
      types: {
        connect: [
          { id: types[0].id },
          { id: types[2].id },
        ]
      }
    }
  })

  await prisma.product.update({
    where: { id: products[1].id },
    data: {
      categories: {
        connect: [
          { id: categories[3].id },
        ]
      },
      types: {
        connect: [
          { id: types[1].id },
        ]
      }
    }
  })

  await prisma.product.update({
    where: { id: products[2].id },
    data: {
      categories: {
        connect: [
          { id: categories[0].id },
          { id: categories[2].id },
          { id: categories[4].id },
        ]
      },
      types: {
        connect: [
          { id: types[2].id },
        ]
      }
    }
  })

  await prisma.product.update({
    where: { id: products[3].id },
    data: {
      categories: {
        connect: [
          { id: categories[1].id },
          { id: categories[4].id },
        ]
      },
      types: {
        connect: [
          { id: types[3].id },
        ]
      }
    }
  })

  await prisma.product.update({
    where: { id: products[4].id },
    data: {
      categories: {
        connect: [
          { id: categories[3].id },
        ]
      },
      types: {
        connect: [
          { id: types[1].id },
          { id: types[3].id },
        ]
      }
    }
  })

  // Crear imágenes para los productos
  const imagesProduct = await prisma.imagesProduct.createMany({
    data: [
      { productId: products[0].id, src: 'prod_1.jpg', alt: 'Aomori Fauna', size: 'wide' },
      { productId: products[1].id, src: 'prod_2.jpg', alt: 'Signal Sky', size: 'wide' },
      { productId: products[2].id, src: 'prod_3.jpg', alt: 'Endwalker', size: 'wide' },
      { productId: products[3].id, src: 'prod_4.jpg', alt: 'iRys', size: 'wide' },
      { productId: products[4].id, src: 'prod_5.jpg', alt: 'Sana', size: 'wide' },
      { productId: products[5].id, src: 'prod_6.png', alt: 'Puerto al alba', size: 'wide' },
      { productId: products[6].id, src: 'prod_7.jpg', alt: 'Puerto al ocaso', size: 'wide' },
      { productId: products[7].id, src: 'prod_8.jpg', alt: 'Cafe Hyouka', size: 'wide' },
      { productId: products[8].id, src: 'prod_9.jpg', alt: 'Cage interpretation', size: 'wide' },
      { productId: products[9].id, src: 'prod_11.jpg', alt: 'Dragon dance - Zuko', size: 'wide' },
      { productId: products[10].id, src: 'prod_10.jpg', alt: 'Dragon dance - Aang', size: 'wide' },
      { productId: products[11].id, src: 'prod_12.jpg', alt: 'Pokemon Galicia', size: 'wide' },
      { productId: products[12].id, src: 'prod_13.jpg', alt: 'Temple Yue', size: 'wide' },
      { productId: products[13].id, src: 'prod_14.png', alt: 'Moonholder Yue', size: 'tall' },
      { productId: products[14].id, src: 'prod_15.jpg', alt: 'Agni kai', size: 'wide' },
      { productId: products[15].id, src: 'prod_16.jpg', alt: 'Hoenn', size: 'square' },
      { productId: products[16].id, src: 'prod_17.jpg', alt: 'Hyouka finale', size: 'wide' },
      { productId: products[17].id, src: 'prod_18.jpeg', alt: 'Starry night', size: 'wide' },
      { productId: products[18].id, src: 'prod_19.jpg', alt: 'Heize', size: 'square' },
      { productId: products[19].id, src: 'prod_20.jpg', alt: 'Kokomi', size: 'tall' },
    ],
  });

  console.log('Imágenes de productos creadas:', imagesProduct);

  // Crear órdenes con líneas de pedidos
  const orders = await prisma.order.createMany({
    data: [
      { slug: 'order-001', userId: 3, total: 120.99 },
      { slug: 'order-002', userId: 4, total: 220.5 },
      { slug: 'order-003', userId: 3, total: 95.75 },
      { slug: 'order-004', userId: 4, total: 150.25 },
      { slug: 'order-005', userId: 3, total: 199.99 },
    ],
  });

  console.log('Órdenes creadas:', orders);

  const carousels = await prisma.carousel.createMany({
    data: [
      {
        title: 'Aomori Fauna',
        slug: 'aomori-fauna',
        description: '¡Últimas unidades en prints firmadas, date prisa para conseguir una!',
        image: 'carousel_1.jpg',
      },
      {
        title: 'Backgrounds',
        slug: 'backgrounds',
        description: 'Echa un vistazo a la categoría con los mejores paisajes',
        image: 'carousel_2.jpg',
      },
      {
        title: 'Final Fantasy XIV',
        slug: 'final-fantasy-xiv',
        description: 'Rememora tus escenas favoritas con la colección del aclamado MMO',
        image: 'carousel_3.jpg',
      },
      {
        title: 'Fanarts',
        slug: 'fanarts',
        description: '¡Descubre nuestro catálogo de Fanarts!',
        image: 'carousel_4.jpg',
      },
    ],
  });

  console.log('Carruseles creados:', carousels);

  // Crear perfiles de usuario
  const profiles = await prisma.profile.createMany({
    data: [
      { username: 'artist_one', bio: 'Digital artist specialized in illustrations.', avatar: 'https://via.placeholder.com/150', userId: 1 },
      { username: 'artist_two', bio: '3D modeler and animation enthusiast.', avatar: 'https://via.placeholder.com/150', userId: 2 },
      { username: 'user_one', bio: 'Art collector and enthusiast.', avatar: 'https://via.placeholder.com/150', userId: 3 },
      { username: 'user_two', bio: 'Photographer and digital art fan.', avatar: 'https://via.placeholder.com/150', userId: 4 },
    ],
  });

  console.log('Perfiles creados:', profiles);

  // Crear favoritos
  const favorites = await prisma.favorites.createMany({
    data: [
      { productId: 1, userId: 3 },
      { productId: 2, userId: 3 },
      { productId: 3, userId: 4 },
      { productId: 4, userId: 4 },
    ],
  });

  console.log('Favoritos creados:', favorites);

  // Crear seguidores
  const follows = await prisma.follows.createMany({
    data: [
      { followerId: 3, followingId: 1 },
      { followerId: 4, followingId: 1 },
      { followerId: 3, followingId: 2 },
      { followerId: 4, followingId: 2 },
    ],
  });

  console.log('Seguidores creados:', follows);

  // Crear notificaciones
  const notifications = await prisma.notification.createMany({
    data: [
      { message: 'Your artwork has been approved!', userId: 1 },
      { message: 'New follower: user_one.', userId: 1 },
      { message: 'Your order has been shipped.', userId: 3 },
      { message: 'Your payment has been confirmed.', userId: 4 },
    ],
  });

  console.log('Notificaciones creadas:', notifications);

  // Crear carritos
  const carts = await prisma.cart.createMany({
    data: [
      { userId: 3, total: 0 },
      { userId: 4, total: 0 },
    ],
  });

  console.log('Carritos creados:', carts);

  // Crear líneas de órdenes
  const orderLines = await prisma.orderLine.createMany({
    data: [
      { orderId: 1, productId: 1, quantity: 1, price: 120.99 },
      { orderId: 2, productId: 2, quantity: 1, price: 220.5 },
      { orderId: 3, productId: 3, quantity: 2, price: 191.5 },
      { orderId: 4, productId: 4, quantity: 1, price: 150.25 },
    ],
  });

  console.log('Líneas de órdenes creadas:', orderLines);

  // Crear tokens
  const tokens = await prisma.token.createMany({
    data: [
      { token: 'abc123', userId: 1 },
      { token: 'def456', userId: 2 },
      { token: 'ghi789', userId: 3 },
    ],
  });

  console.log('Tokens creados:', tokens);

  // Crear tokens en la lista negra
  const blacklistedTokens = await prisma.blacklist.createMany({
    data: [
      { token: 'expiredToken123' },
      { token: 'maliciousToken456' },
    ],
  });

  console.log('Tokens en lista negra creados:', blacklistedTokens);

  console.log('Datos dummy creados con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
