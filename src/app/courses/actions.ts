"use server"

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { createCourseService } from "@/services/course"
import { createCourseRepository } from "@/repositories/course"

const courseRepository = createCourseRepository()
const courseService = createCourseService(courseRepository)

export async function createCourseAction(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Não autorizado")
  }

  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const content = formData.get("content") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const image = formData.get("image") as string
    const categoryId = formData.get("categoryId") as string

    if (!title?.trim()) {
      throw new Error("Título é obrigatório")
    }
    if (!description?.trim()) {
      throw new Error("Descrição é obrigatória")
    }
    if (!content?.trim()) {
      throw new Error("Conteúdo é obrigatório")
    }
    if (!categoryId) {
      throw new Error("Categoria é obrigatória")
    }
    if (Number.isNaN(price) || price < 0) {
      throw new Error("Preço deve ser um número válido maior ou igual a zero")
    }

    await courseService.createCourse({
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      price,
      image: image?.trim() || undefined,
      categoryId,
    })

    redirect("/admin")
  } catch (error) {
    throw error
  }
}

export async function updateCourseAction(courseId: string, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Não autorizado")
  }

  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const content = formData.get("content") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const image = formData.get("image") as string
    const categoryId = formData.get("categoryId") as string

    if (!title?.trim()) {
      throw new Error("Título é obrigatório")
    }
    if (!description?.trim()) {
      throw new Error("Descrição é obrigatória")
    }
    if (!content?.trim()) {
      throw new Error("Conteúdo é obrigatório")
    }
    if (!categoryId) {
      throw new Error("Categoria é obrigatória")
    }
    if (Number.isNaN(price) || price < 0) {
      throw new Error("Preço deve ser um número válido maior ou igual a zero")
    }

    await courseService.updateCourse({
      id: courseId,
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      price,
      image: image?.trim() || undefined,
      categoryId,
    })

    redirect("/admin")
  } catch (error) {
    throw error
  }
}
