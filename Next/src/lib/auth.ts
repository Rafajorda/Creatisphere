import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import argon2 from 'argon2'

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
    maxAge: 1 * 1 * 60 * 60, 
    updateAge: 0.25* 1 * 60 * 60, 
  },
  jwt: {
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
   
        return {
          ...token,     
          email: user.email, 
          role: user.role,   
        };
      }

       return token;
     },
    async session({ session, token }: { session: any, token: any }) { 
      session.user = {
        email: token.email,
        role: token.role,
      };
     
      console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};
