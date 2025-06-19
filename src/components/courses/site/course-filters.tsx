"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Category } from "@/interfaces/category"

interface CourseFiltersProps {
  categories: Category[]
  currentFilters: {
    search: string
    categorySlug: string
    page: number
  }
}

export function CourseFilters({ categories, currentFilters }: CourseFiltersProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || "")
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.categorySlug || "")

  const applyFilters = (category: string, search: string) => {
    const params = new URLSearchParams()

    if (category && category !== "") {
      params.set("category", category)
    }
    if (search && search.trim() !== "") {
      params.set("search", search.trim())
    }
    const queryString = params.toString()

    const newUrl = `/site/courses${queryString ? `?${queryString}` : ""}`

    router.push(newUrl)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value
    setSelectedCategory(category)
    applyFilters(category, searchTerm)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters(selectedCategory, searchTerm)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    router.push("/site/courses")
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(selectedCategory || searchTerm) && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Filtros ativos:</span>
          {selectedCategory && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {categories.find((c) => c.slug === selectedCategory)?.name}
            </span>
          )}
          {searchTerm && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">"{searchTerm}"</span>
          )}
          <button onClick={clearFilters} className="text-red-600 hover:text-red-800 text-sm underline ml-2">
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
