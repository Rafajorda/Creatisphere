'use server';
import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { ApiResponse } from "../exceptions"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
export async function POST(request: NextRequest) {
    console.log("📤 Uploading file...");
    console.log("📥 Request body:", request);

    const { fileName, fileData } = await request.json();
    const session = await getServerSession(authOptions);
    if (!fileName || !fileData) {
        return ApiResponse.badRequest("No se proporcionaron archivos");
    }
    if (!session || !session.user || !session.user.id) {
        return ApiResponse.unauthorized("Usuario no autorizado");
    }
        console.log(session);
    const uploadDir = join(process.cwd(), "public", "assets", "products", session?.user.id.toString());
      
    const filePath = join(uploadDir, fileName);

    try {
        const buffer = Buffer.from(fileData, 'base64');
        await writeFile(filePath, buffer);

        return ApiResponse.ok("Archivo subido exitosamente");
    } catch (error) {
        console.error("Error al subir archivo:", error);
        return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 });
    }
}
