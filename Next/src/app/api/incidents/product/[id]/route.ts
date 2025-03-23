import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import getCurrentUser from '@/actions/getCurrentUser';
import { ApiResponse } from "@/app/api/exceptions";

export async function PUT( req: NextRequest, context: { params: { id: number } }) {
    const { params } = context;
    if (!params) {
        return ApiResponse.badRequest('Missing parameters');
    }
    const id = params.id.toString();
 

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return ApiResponse.unauthorized('User not authenticated');
    }

    const incident = await prisma.incidents.findUnique({
        where: {
            id: parseInt(id),
        },
    });
   
    if (!incident) {
        return ApiResponse.notFound('Incident not found');
    }

    try {
        const updatedIncident = await prisma.incidents.update({
            where: {
            id: incident.id,
            },
            data: {
            status: incident.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
            },
        });
        return ApiResponse.ok(updatedIncident);
    } catch (e) {
        console.log(e);
        return ApiResponse.badRequest('Error updating incident');
    }
}