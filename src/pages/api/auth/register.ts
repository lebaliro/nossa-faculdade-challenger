import type { NextApiRequest, NextApiResponse } from "next"
import { createAuthService } from "@/services/auth"
import { createUserRepository } from "@/repositories/user"

const userRepository = createUserRepository()
const authService = createAuthService(userRepository)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" })
  }

  const { name, email, password } = req.body

  try {
    const user = await authService.register({
      name,
      email,
      password,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const { password: _, ...userWithoutPassword } = user as any

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Erro ao criar usuário:", error)

    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  }
}
