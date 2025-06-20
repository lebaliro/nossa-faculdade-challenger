import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { createCourseService } from "@/services/course"
import { createCourseRepository } from "@/repositories/course"

interface DeleteCourseProps {
  params: Promise<{id: string}>
}

const courseRepository = createCourseRepository()
const courseService = createCourseService(courseRepository)

export async function DELETE(request: NextRequest, { params }: DeleteCourseProps) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    await courseService.deleteCourse((await params).id)
    return NextResponse.json({ message: "Curso excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir curso:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
