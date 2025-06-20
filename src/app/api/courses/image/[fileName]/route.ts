import { type NextRequest, NextResponse } from "next/server"
import { join } from "path"
import { stat, readFile } from "fs/promises"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    const { fileName } = (await params)
    if (!fileName) {
      return new NextResponse("Arquivo não informado", { status: 400 })
    }

    const filePath = join(process.cwd(), "public", "imgs", "uploads", "courses", fileName)

    await stat(filePath)

    const fileBuffer = await readFile(filePath)

    let contentType = "application/octet-stream"
    if (fileName.endsWith(".webp")) contentType = "image/webp"
    else if (fileName.endsWith(".png")) contentType = "image/png"
    else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) contentType = "image/jpeg"

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.log(error)
    return new NextResponse("Arquivo não encontrado", { status: 404 })
  }
}