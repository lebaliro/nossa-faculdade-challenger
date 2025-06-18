"use client"

import { useState } from "react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  if (result?.success) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-600 mb-2">Mensagem Enviada!</h3>
        <p className="text-gray-600 mb-6">{result.message}</p>
        <button
          onClick={() => setResult(null)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Enviar nova mensagem
        </button>
      </div>
    )
  }

  return (
    <form id="contact-form" className="space-y-6">
      {result && !result.success && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{result.message}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nome Completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Assunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Assunto da mensagem"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
          placeholder="Escreva sua mensagem aqui..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          isSubmitting ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Enviando...
          </div>
        ) : (
          "Enviar Mensagem"
        )}
      </button>
    </form>
  )
}
