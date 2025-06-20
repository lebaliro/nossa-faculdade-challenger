import { type NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import { join } from "path"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const fileName = searchParams.get("fileName")
    if (!fileName) {
      return NextResponse.json({ error: "Arquivo não informado" }, { status: 400 })
    }

    const filePath = join(process.cwd(), "public", "imgs", "uploads", "courses", fileName)
    await unlink(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar imagem:", error)
    return NextResponse.json({ error: "Erro ao deletar imagem" }, { status: 500 })
  }
}