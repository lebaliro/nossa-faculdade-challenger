"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface PurchaseButtonProps {
  courseId: string
  courseTitle: string
}

export function PurchaseButton({ courseId, courseTitle }: PurchaseButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePurchase = async () => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    router.push(`/courses/detail/${courseId}`)
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={isLoading}
      className={`group relative overflow-hidden bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
        isLoading ? "opacity-50 cursor-not-allowed scale-100" : ""
      }`}
    >
      <div className="flex items-center justify-center">
        {isLoading ? (
          <>
            <div className="spinner mr-3"></div>
            Processando compra...
          </>
        ) : (
          <>
            Comprar Agora
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </button>
  )
}
