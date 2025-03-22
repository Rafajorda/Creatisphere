import { getIncidentFrom } from "@/actions/getIncident"
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const { productId } = await req.json();
    const incidents = await getIncidentFrom('productId', productId);

    return incidents;
}

