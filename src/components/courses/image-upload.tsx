"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, onRemove, disabled = false }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/courses/image/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro no upload")
      }

      onChange(result.url)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao fazer upload")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemove = async () => {
    if (!value) return
    const fileName = value.split("/").pop()
    try {
      await fetch(`/api/courses/image/delete?fileName=${fileName}`, {
        method: "DELETE",
      })
      onRemove()
    } catch (error) {
      alert(`Erro ao remover imagem do servidor: ${error}` )
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {value ? (
        <div>
          <div className="relative w-full max-w-xs h-48 border rounded-lg overflow-hidden mx-auto">
            <Image
              src={value || "/placeholder.svg"}
              alt="Imagem do curso"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled || isUploading}
              className="px-4 py-2 bg-red-500 text-white rounded text-sm disabled:opacity-50"
            >
              Remover Imagem
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center disabled:opacity-50"
        >
          {isUploading ? (
            <p>Enviando...</p>
          ) : (
            <>
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-gray-600">Clique para enviar imagem</p>
              <p className="text-sm text-gray-500">JPG ou PNG</p>
            </>
          )}
        </button>
      )}
    </div>
  )
}
