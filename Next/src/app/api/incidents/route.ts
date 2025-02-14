import { getAllIncidents } from "@/actions/getIncident"
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { ApiResponse } from "../exceptions";

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

    return ApiResponse.ok("Incident created successfully");
}