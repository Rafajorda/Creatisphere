import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { ApiResponse } from "../exceptions"
export async function POST(request: NextRequest) {
    const { fileName, fileData } = await request.json();

    if (!fileName || !fileData) {
        return ApiResponse.badRequest("No se proporcionaron archivos");
    }

    const uploadDir = join(process.cwd(), "public", "assets", "3d");
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
