import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/app/api/exceptions'
import { userRegisterSchema } from '@/validation/schema'
import argon2 from 'argon2'
const fs = require('fs');
const path = require('path');

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const result = userRegisterSchema.safeParse(body.user)
  if (!result.success) {
    return ApiResponse.badRequest(result.error)
  }

  const { username, email, password, repeatpassword } = result.data

  if (password !== repeatpassword) {
    return ApiResponse.badRequest('Passwords do not match')
  }

  const hashPassword = await argon2.hash(password)
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return ApiResponse.badRequest('Email is already registered')
    }
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        profile: {
          create: {
            username,
          },
        },
      },
      include: {
        profile: true,
      },

    })
    console.log('User created:', user);
    const userFolderPath = path.join(process.cwd(), 'public', 'assets', 'products', user.id.toString());

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }
    return ApiResponse.ok({
      username: user.profile?.username,
      email: user.email,
      createdAt: user.createdAt,
    })
  } catch (e) {
    console.error('Error during registration:', e);
    return ApiResponse.badRequest('Register fail')
  }
}
