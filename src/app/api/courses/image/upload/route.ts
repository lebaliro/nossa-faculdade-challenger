import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import sharp from "sharp"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const data = await request.formData()
    const file: File | undefined = data.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split(".").pop()
    const fileName = `${timestamp}-${random}.${extension}`

    const uploadDir = join(process.cwd(), "public", "imgs", "uploads", "courses")
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
        console.error("Erro no upload:", error)
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const resizedBuffer = await sharp(buffer)
      .resize(400, 250)
      .toBuffer()

    const filePath = join(uploadDir, fileName)
    await writeFile(filePath, resizedBuffer)

    const publicUrl = `/imgs/uploads/courses/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
    })
  } catch (error) {
    console.error("Erro no upload:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
