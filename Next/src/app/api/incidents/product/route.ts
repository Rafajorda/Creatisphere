import { getIncidentFrom } from "@/actions/getIncident"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import getCurrentUser from "@/actions/getCurrentUser"

export const GET = async (req: NextRequest) => {
    const { productId } = await req.json();
    const incidents = await getIncidentFrom('productId', productId);

    return incidents;
}

export const POST = async (req: NextRequest) => {
    
        const body = await req.json();
console.log('body', body);
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id;
  const randomNum = Math.floor(Math.random() * 10000);  // Generates a random number between 0 and 9999
  const slug = `${body.productId}-${userId}-${'error'}-${randomNum}`;
 
  const incidentData: any = {
    slug: slug,
    productId: body.productId || null,  // explicitly set null if no productId
    description: body.description || null, // explicitly set null if no description
    type: 'error',
    userId: userId ? parseInt(userId.toString()) : undefined, // ensure userId is set if available
};

if (userId) {
    incidentData.userId = parseInt(userId.toString());
}
console.log('incidentData', incidentData);
const incident = await prisma.incidents.create({
    data: incidentData
});
console.log('incident', incident);

return NextResponse.json({ success: true, incident }, { status: 201 });
}