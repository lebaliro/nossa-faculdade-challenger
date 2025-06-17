import { CreateUserData, User } from "@/interfaces/user"

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthUser | null>
  register(data: CreateUserData): Promise<User>
  validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>
  hashPassword(password: string): Promise<string>
}
