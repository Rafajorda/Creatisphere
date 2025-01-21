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

        if (!user || !user?.password) {
          return null
        }

        const isCorrectPassword = await argon2.verify(
          credentials.password,
          user.password,
        )

        if (!isCorrectPassword) {
          return null
        }

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
}
