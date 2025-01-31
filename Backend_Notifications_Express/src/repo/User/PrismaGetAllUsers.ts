import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export default async function prismaGetAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
        where: {
            role: {
                not: 'ADMIN',  // Excluye los usuarios con rol 'ADMIN'
            }
        },
        include: {
            profile: true,
            premium: true,
        }
    });
    return users;
}