import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken';



const ACCESS_TOKEN_EXPIRES_IN = 15 * 60 * 1000; 
const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; 

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
       
        
        if (!user || !user.password) {
          console.error('User not found or no password stored') // Log para depurar
          return null
        }

        const isCorrectPassword = await argon2.verify(
          user.password,
          credentials.password,
        )

        if (!isCorrectPassword) {
          return null
        }
       console.log("user", user.id, user.status);
        return {
          id: user.id.toString(),
          email: user.email,
          password: user.password,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          accessToken: user.accessToken,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        const accessToken = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.REFRESH_TOKEN_SECRET!,
          { expiresIn: '7d' }
        );

        return {
          ...token,
          accessToken,
          refreshToken,
          accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN,
          id: user.id,       
          email: user.email, 
          role: user.role,   
        };
      }

      // Handle token refresh if access token has expired
      if (Date.now() > token.accessTokenExpires) {
        return refreshAccessToken(token);
      }
      
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      console.log("Token en el callback de session:", token);
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};


async function refreshAccessToken(token: any) {
  try {
    const { refreshToken } = token;

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

  
    if (typeof decoded !== 'string' && 'id' in decoded) {
      const newAccessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '15m' }
      );

      return {
        ...token,
        accessToken: newAccessToken,
        accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN,
      };
    } else {
      throw new Error('Invalid token payload');
    }

  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
