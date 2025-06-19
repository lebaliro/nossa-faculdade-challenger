import { compare, hash } from "bcryptjs"
import type { AuthService as AuthServiceInterface, LoginCredentials, AuthUser } from "@/interfaces/auth"
import type { CreateUserData, User, UserRepository } from "@/interfaces/user"

export class AuthService implements AuthServiceInterface {
  constructor(private userRepository: UserRepository) {}

  async login(credentials: LoginCredentials): Promise<AuthUser | null> {

    if (!credentials.email || !credentials.password) {
      throw new Error("Email e senha são obrigatórios")
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error("Email inválido")
    }

    const user = await this.userRepository.findByEmailWithPassword(credentials.email)
    if (!user) {
      return null
    }
    const isPasswordValid = await this.validatePassword(credentials.password, user.password)
    if (!isPasswordValid) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }

  async register(data: CreateUserData): Promise<User> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Nome, email e senha são obrigatórios")
    }

    if (!this.isValidEmail(data.email)) {
      throw new Error("Email inválido")
    }

    if (data.password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres")
    }

    const existingUser = await this.userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new Error("Usuário já existe com este email")
    }

    const hashedPassword = await this.hashPassword(data.password)

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    })

    return user
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(plainPassword, hashedPassword)
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, 12)
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

export const createAuthService = (userRepository: UserRepository): AuthService => {
  return new AuthService(userRepository)
}
