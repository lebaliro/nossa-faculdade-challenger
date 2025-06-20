/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import type React from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { formatPrice } from "@/lib/utils"
import { PaginatedCourses } from "@/interfaces/course"
import { Category } from "@/interfaces/category"

export default function AdminPage() {
  const { data: session } = useSession()
  const [courses, setCourses] = useState<PaginatedCourses>()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
    page: 1,
  })

  useEffect(() => {
    loadCategories()
    loadCourses()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }))
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm])

  useEffect(() => {
    loadCourses()
  }, [filters])

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      setError("Erro ao carregar categorias")
    }
  }

  const loadCourses = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.set("search", filters.search)
      if (filters.categoryId) params.set("categoryId", filters.categoryId)
      if (filters.page > 1) params.set("page", filters.page.toString())
      const response = await fetch(`/api/courses?${params.toString()}`)
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      setError("Erro ao carregar cursos")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (courseId: string, courseTitle: string) => {
    if (!confirm(`Tem certeza que deseja excluir o curso "${courseTitle}"?`)) return

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        loadCourses()
      } else {
        const errorData = await response.json()
        alert(`Erro ao excluir curso: ${errorData.error || "Erro desconhecido"}`)
      }
    } catch (error) {
      alert("Erro ao excluir curso")
    }
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      categoryId: "",
      page: 1,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Painel Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Olá, <strong>{session?.user?.name}</strong>
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                <input
                  type="text"
                  placeholder="Nome do curso..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => setFilters({ ...filters, categoryId: e.target.value, page: 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {(filters.search || filters.categoryId) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors 
                             disabled:opacity-50 disabled:cursor-not-allowed self-end"
                >
                  Limpar
                </button>
              )}
            </div>

            <Link
              href="/courses/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              + Novo Curso
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
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
                <h3 className="text-sm font-medium text-red-800">Erro</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={() => {
                    setError(null)
                    loadCourses()
                  }}
                  className="text-sm text-red-600 underline hover:no-underline mt-2"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando cursos...</p>
            </div>
          ) : courses && courses.courses.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Curso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={course.image || "https://placehold.co/48"}
                                alt={course.title}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">{course.title}</div>
                              <div className="text-sm text-gray-500 line-clamp-2">{course.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {course.category.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPrice(course.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/courses/detail/${course.id}`}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              Ver
                            </Link>
                            <Link
                              href={`/courses/update/${course.id}`}
                              className="text-indigo-600 hover:text-indigo-900 transition-colors"
                            >
                              Editar
                            </Link>
                            <button
                              onClick={() => handleDelete(course.id, course.title)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {courses.totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
                      disabled={filters.page === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, page: Math.min(courses.totalPages, filters.page + 1) })}
                      disabled={filters.page === courses.totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próximo
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(filters.page - 1) * 10 + 1}</span> até{" "}
                        <span className="font-medium">{Math.min(filters.page * 10, courses.total)}</span> de{" "}
                        <span className="font-medium">{courses.total}</span> resultados
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
                          disabled={filters.page === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Anterior
                        </button>
                        {Array.from({ length: Math.min(5, courses.totalPages) }, (_, i) => {
                          const page = i + 1
                          return (
                            <button
                              key={page}
                              onClick={() => setFilters({ ...filters, page })}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === filters.page
                                  ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          )
                        })}
                        <button
                          onClick={() =>
                            setFilters({ ...filters, page: Math.min(courses.totalPages, filters.page + 1) })
                          }
                          disabled={filters.page === courses.totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Próximo
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filters.search || filters.categoryId ? "Nenhum curso encontrado" : "Nenhum curso cadastrado"}
              </h3>
              <p className="text-gray-500 mb-4">
                {filters.search || filters.categoryId
                  ? "Tente ajustar os filtros ou buscar por outros termos."
                  : "Comece criando seu primeiro curso."}
              </p>
              {filters.search || filters.categoryId ? (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Limpar Filtros
                </button>
              ) : (
                <Link
                  href="/admin/courses/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Criar Primeiro Curso
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
