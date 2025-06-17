import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { createAuthService } from "@/services/auth"
import { createUserRepository } from "@/repositories/user"

// Instanciar services
const userRepository = createUserRepository()
const authService = createAuthService(userRepository)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        console.log("[AUTH] Tentativa de login:", { email: credentials?.email })

        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Credenciais faltando")
          return null
        }

        try {
          // Usar o service para fazer login
          const user = await authService.login({
            email: credentials.email,
            password: credentials.password,
          })
          
          if (!user) {
            console.log("[AUTH] Login falhou")
            return null
          }

          console.log("[AUTH] Login bem-sucedido")
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("[AUTH] Erro na autorização:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)
