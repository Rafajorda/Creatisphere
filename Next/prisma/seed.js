require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
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
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Digital Paintings', slug: 'digital-paintings', image: 'https://via.placeholder.com/300' },
      { name: '3D Models', slug: '3d-models', image: 'https://via.placeholder.com/300' },
      { name: 'Illustrations', slug: 'illustrations', image: 'https://via.placeholder.com/300' },
      { name: 'Photography', slug: 'photography', image: 'https://via.placeholder.com/300' },
      { name: 'Animations', slug: 'animations', image: 'https://via.placeholder.com/300' },
    ],
  });

  console.log('Categorías creadas:', categories);

  // Crear colecciones
  const collections = await prisma.collection.createMany({
    data: [
      { name: 'Summer Vibes', slug: 'summer-vibes', image: 'https://via.placeholder.com/300' },
      { name: 'Cyberpunk Dreams', slug: 'cyberpunk-dreams', image: 'https://via.placeholder.com/300' },
      { name: 'Nature Beauty', slug: 'nature-beauty', image: 'https://via.placeholder.com/300' },
      { name: 'Abstract Art', slug: 'abstract-art', image: 'https://via.placeholder.com/300' },
      { name: 'Futuristic Visions', slug: 'futuristic-visions', image: 'https://via.placeholder.com/300' },
    ],
  });

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
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Sunset Overdrive',
        slug: 'sunset-overdrive',
        price: 120.99,
        stock: 10,
        userId: 1,
        collectionId: 1,
        seriesId: 1,
      },
      {
        name: 'Cyber Noir',
        slug: 'cyber-noir',
        price: 220.5,
        stock: 5,
        userId: 2,
        collectionId: 2,
        seriesId: 2,
      },
      {
        name: 'Mountain Reflections',
        slug: 'mountain-reflections',
        price: 95.75,
        stock: 15,
        userId: 1,
        collectionId: 3,
        seriesId: 3,
      },
      {
        name: 'Urban Chaos',
        slug: 'urban-chaos',
        price: 150.25,
        stock: 8,
        userId: 2,
        collectionId: 4,
        seriesId: 4,
      },
      {
        name: 'Dreamscape',
        slug: 'dreamscape',
        price: 199.99,
        stock: 12,
        userId: 1,
        collectionId: 5,
        seriesId: 5,
      },
    ],
  });

  console.log('Productos creados:', products);

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
