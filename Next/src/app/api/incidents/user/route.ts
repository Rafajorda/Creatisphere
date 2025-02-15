import { getIncidentFrom } from "@/actions/getIncident"
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const { userId } = await req.json();
    const incidents = await getIncidentFrom('userId', userId);

    return incidents;
}