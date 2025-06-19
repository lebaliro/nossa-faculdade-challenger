import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "@/components/session-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cursos Online - Transforme sua carreira",
  description: "Os melhores cursos online para impulsionar sua carreira profissional",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
