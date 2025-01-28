import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export default async function prismaGetUser(username: string): Promise<User | null> {
const user = await prisma.user.findFirst({
    where: {
        profile: {
            username: username
        }
    },
    include: {
        profile: true
    }
});
return user;
}