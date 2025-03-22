'use server';

import { prisma } from '@/lib/prisma';
import { UserProfileResponse } from '@/types/UserProfile';
import { userMapper } from '@/app/api/UserMapper';
import getCurrentUser from './getCurrentUser';

export default async function getUserProfile(username: string): Promise<UserProfileResponse | null> {
  try {
    if (!username) {
      console.error('No se proporcionó un username');
      return null;
    }

    // Buscar al usuario por username incluyendo las relaciones necesarias
    const user = await prisma.user.findFirst({
      where: {
        profile: {
          username: username, // Búsqueda por username desde la sesión
        },
      },
      include: {
        profile: true,

        products: {
          include: {
            categories: true,
            ImagesProduct: true,
            productPrices: true,
          },
        },
        favorites: {
          include: {
            favoriting: {
              include: {
                categories: true,
                ImagesProduct: true,
                artist: {
                  include: {
                    profile: true,
                  },
                },
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                profile: true,  // Incluimos el perfil completo de la persona que el usuario sigue
              },
            },
          },
        },
        followers: {
          include: {
            follower: {  // Aquí obtenemos el usuario que sigue al perfil
              include: {
                profile: true,  // Incluimos el perfil completo del seguidor
              },
            },
          },
        },
        notifications: true,
        Cart: {
          include: {
            cartLines: {
              include: {
                productPrice: {
                  include: {
                    product: true
                  }
                }
              },
            },
          },
        },
        Order: {
          include: {
            orderLines: {
              include: {
                productprice: {
                  include: {
                    product: {
                      include: {
                        ImagesProduct: true,
                      },
                    },
                    type: true,
                  },
                },
              },
            },
          },
        },
        returns: {
          include: {
            returnsLine: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    console.log('getUserProfile user:', user);
    // Si no se encuentra al usuario, retornamos null
    if (!user) {
      return null;
    }

    const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //   return null;
    // }

    return userMapper(user, currentUser);
  } catch (error) {
    console.error('Error en getUserProfile:', error);
    return null;
  }
}
