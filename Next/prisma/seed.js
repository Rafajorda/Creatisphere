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
    data: { name: 'Summer Vibes', slug: 'summer-vibes', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Cyberpunk Dreams', slug: 'cyberpunk-dreams', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Nature Beauty', slug: 'nature-beauty', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Abstract Art', slug: 'abstract-art', image: 'https://via.placeholder.com/300' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Futuristic Visions', slug: 'futuristic-visions', image: 'https://via.placeholder.com/300' },
  }));

  console.log('Colecciones creadas:', collections);
  
  // Crear series
  const series = await prisma.series.createMany({
    data: [
      { name: 'Limited Edition 2023', slug: 'limited-edition-2023', image: 'https://via.placeholder.com/300' },
      { name: 'Pixel Wonders', slug: 'pixel-wonders', image: 'https://via.placeholder.com/300' },
      { name: 'Virtual Sculptures', slug: 'virtual-sculptures', image: 'https://via.placeholder.com/300' },
      { name: 'Digital Impressions', slug: 'digital-impressions', image: 'https://via.placeholder.com/300' },
      { name: 'Neo-Art Collection', slug: 'neo-art-collection', image: 'https://via.placeholder.com/300' },
    ],
  });

  console.log('Series creadas:', series);

  // Crear productos con relaciones
  const products = [];
  products.push(await prisma.product.create({
    data: {
      name: 'Sunset Overdrive',
      slug: 'sunset-overdrive',
      price: 120.99,
      stock: 10,
      userId: 1,
      collectionId: 1,
      seriesId: 1,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Cyber Noir',
      slug: 'cyber-noir',
      price: 220.5,
      stock: 5,
      userId: 2,
      collectionId: 2,
      seriesId: 2,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Mountain Reflections',
      slug: 'mountain-reflections',
      price: 95.75,
      stock: 15,
      userId: 1,
      collectionId: 3,
      seriesId: 3,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Urban Chaos',
      slug: 'urban-chaos',
      price: 150.25,
      stock: 8,
      userId: 2,
      collectionId: 4,
      seriesId: 4,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Dreamscape',
      slug: 'dreamscape',
      price: 199.99,
      stock: 12,
      userId: 1,
      collectionId: 5,
      seriesId: 5,
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
      { productId: 1, image: 'https://via.placeholder.com/600', alt: 'Sunset Overdrive Image' },
      { productId: 2, image: 'https://via.placeholder.com/600', alt: 'Cyber Noir Image' },
      { productId: 3, image: 'https://via.placeholder.com/600', alt: 'Mountain Reflections Image' },
      { productId: 4, image: 'https://via.placeholder.com/600', alt: 'Urban Chaos Image' },
      { productId: 5, image: 'https://via.placeholder.com/600', alt: 'Dreamscape Image' },
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
        title: 'New Arrivals',
        description: 'Discover the latest trends in digital art.',
        image: 'https://via.placeholder.com/600',
        slug: 'new-arrivals',
      },
      {
        title: 'Exclusive Collections',
        description: 'Explore limited-time collections.',
        image: 'https://via.placeholder.com/600',
        slug: 'exclusive-collections',
      },
      {
        title: 'Top Rated Artists',
        description: 'Meet the most popular creators on our platform.',
        image: 'https://via.placeholder.com/600',
        slug: 'top-rated-artists',
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
