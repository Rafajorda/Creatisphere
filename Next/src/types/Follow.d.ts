import { User } from '@prisma/client';

export interface UserFollower extends Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'email' | 'role'> {
  avatar: string | null; // Incluimos el avatar de perfil
  username: string; // Incluimos el nombre de usuario
}

export interface FollowResponse {
  following: UserFollower[]; // Personas que el usuario sigue
  followers: UserFollower[]; // Personas que siguen al usuario
}