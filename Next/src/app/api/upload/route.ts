import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { ApiResponse } from "../exceptions"

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (files.length === 0) {
        // return NextResponse.json({ error: "No se proporcionaron archivos" }, { status: 400 })
        return ApiResponse.badRequest("No se proporcionaron archivos");
    }

    const uploadDir = join(process.cwd(), "public", "assets", "uploads")

    try {
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer())
            const filePath = join(uploadDir, file.name)
            await writeFile(filePath, buffer)
        }

        // return NextResponse.json({ message: "Archivos subidos exitosamente" })
        return ApiResponse.ok("Archivos subidos exitosamente");
    } catch (error) {
        console.error("Error al subir archivos:", error)
        return NextResponse.json({ error: "Error al subir archivos" }, { status: 500 })
    }
}

