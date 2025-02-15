import { prisma } from '@/lib/prisma';
import { $Enums, Incidents } from '@prisma/client';

export async function getAllIncidents(selectStatus: $Enums.status): Promise<Incidents[]> {
    const data = await prisma.incidents.findMany({
        where: {
            status: selectStatus
        }
    })

    return data;
}

export async function getIncidentFrom(idType: "userId" | "productId" | "orderLineId", id: number): Promise<Incidents[]> {
    const data = await prisma.incidents.findMany({
        where: {
            [idType]: id
        }
    });

    return data;
}