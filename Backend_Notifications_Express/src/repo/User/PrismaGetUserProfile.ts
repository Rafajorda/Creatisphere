import { PrismaClient, User, Profile } from '@prisma/client';
const prisma = new PrismaClient();
type UserProfile = User & { profile: Profile | null };
export default async function PrismaGetUserProfile(id: number): Promise<UserProfile | null> {


const user = await prisma.user.findFirst({
    where: {   
            id: id
    },
    include: {
        profile: true
    }
});
return user ? { ...user, profile: user.profile } : null;
}