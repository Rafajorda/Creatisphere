import { getAllIncidents } from "@/actions/getIncident"
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { ApiResponse } from "../exceptions";
import { fetchWrapper } from "@/utils/fetch";

export const GET = async (req: NextRequest) => {
    const { status } = await req.json();
    const incidents = await getAllIncidents(status);

    return incidents;
}

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const slug = body.name.toLowerCase().replace(/ /g, "-");

    const newIncident = await prisma.incidents.create({
        data: {
            slug: slug,
            userId: body.userId,
            productId: body.productId ?? null,
            orderLineId: body.orderLineId ?? null,
            description: body.description ?? null,
            type: body.type,
        }
    })

    if (!newIncident) {
        return ApiResponse.badRequest("Incident not created");
    }

    const emailIncident = await fetchWrapper("http://localhost:4000/api/notifications/Incidents", "POST", {
        incident: newIncident.id
    })

    if (!emailIncident) {
        ApiResponse.badRequest("Email not sent");
    }

    return ApiResponse.ok("Incident created successfully");
}

export const PUT = async (req: NextRequest) => {
    const body = await req.json();
    const { id, status } = body;

    const updatedIncident = await prisma.incidents.update({
        where: {
            id: id
        },
        data: {
            status: status,
            updatedAt: new Date()
        }
    })

    if (!updatedIncident) {
        return ApiResponse.badRequest("Incident not updated");
    }

    return ApiResponse.ok("Incident updated successfully");
}