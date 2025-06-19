"use client"

import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { createCourseAction, updateCourseAction } from "@/app/courses/actions"

interface Category {
  id: string
  name: string
  slug: string
}

interface CourseFormData {
  title: string
  description: string
  content: string
  price: string
  image: string
  categoryId: string
}

interface CreateUpdateCourseFormProps {
  categories: Category[]
  initialData?: Partial<CourseFormData>
  isEditing?: boolean
  courseId?: string
}

export function CreateUpdateCourseForm({
  categories,
  initialData,
  isEditing = false,
  courseId,
}: CreateUpdateCourseFormProps) {
  const router = useRouter()

  const [createState, createAction, createPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        await createCourseAction(formData)
        return { success: true, error: null }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Erro ao criar curso",
        }
      }
    },
    { success: false, error: null },
  )

  const [updateState, updateAction, updatePending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        if (!courseId) throw new Error("ID do curso não encontrado")
        await updateCourseAction(courseId, formData)
        return { success: true, error: null }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Erro ao atualizar curso",
        }
      }
    },
    { success: false, error: null },
  )

  const currentState = isEditing ? updateState : createState
  const currentAction = isEditing ? updateAction : createAction
  const isPending = isEditing ? updatePending : createPending

  return (
    <div className="max-w-4xl mx-auto">
      <form action={currentAction} className="space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Informações Básicas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título do Curso *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={initialData?.title || ""}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Desenvolvimento Web Completo"
              />
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                defaultValue={initialData?.categoryId || ""}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Preço (R$) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={initialData?.price || "0"}
                min="0"
                step="0.01"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                URL da Imagem
              </label>
              <input
                type="url"
                id="image"
                name="image"
                defaultValue={initialData?.image || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">Deixe em branco para usar imagem padrão</p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição Curta *
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={initialData?.description || ""}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descrição que aparecerá na listagem de cursos..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Conteúdo do Curso</h2>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo Detalhado *
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={initialData?.content || ""}
              required
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descreva o conteúdo completo do curso, módulos, o que o aluno vai aprender..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Use quebras de linha para organizar o conteúdo. Suporte a Markdown será adicionado em breve.
            </p>
          </div>
        </div>

        {currentState?.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Erro ao salvar curso</h3>
                <p className="text-sm text-red-700 mt-1">{currentState.error}</p>
              </div>
            </div>
          </div>
        )}

        {currentState?.success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  {isEditing ? "Curso atualizado com sucesso!" : "Curso criado com sucesso!"}
                </h3>
                <p className="text-sm text-green-700 mt-1">Redirecionando para a lista de cursos...</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between bg-white rounded-lg shadow p-6">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className={`px-6 py-3 border border-gray-300 rounded-lg font-medium transition-colors ${
              isPending ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            Cancelar
          </button>

          <div className="flex items-center space-x-3">

            <button
              type="submit"
              disabled={isPending}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isPending ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isPending ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  {isEditing ? "Salvando..." : "Criando..."}
                </div>
              ) : isEditing ? (
                "Salvar Alterações"
              ) : (
                "Criar Curso"
              )}
            </button>
          </div>
        </div>


        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">Campos obrigatórios</h3>
              <p className="text-sm text-gray-600 mt-1">
                Os campos marcados com * são obrigatórios. Certifique-se de preenchê-los antes de salvar o curso.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
