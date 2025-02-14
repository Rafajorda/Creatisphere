import { getAllIncidents } from "@/actions/getIncident"
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const { status } = await req.json();
    const incidents = await getAllIncidents(status);

    return incidents;
}