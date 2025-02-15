import { getIncidentFrom } from "@/actions/getIncident"
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const { orderLineId } = await req.json();
    const incidents = await getIncidentFrom('orderLineId', orderLineId);

    return incidents;
}