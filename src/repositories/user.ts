import { prisma } from "@/lib/prisma"
import type { User, UserWithPassword, CreateUserData, UserRepository as UserRepositoryInterface } from "@/interfaces/user"

export class UserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user ? this.mapToUser(user) : null
  }

  async findByEmailWithPassword(email: string): Promise<UserWithPassword | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      // Buscar todos os campos incluindo password
    })

    return user ? this.mapToUserWithPassword(user) : null
  }

  async create(data: CreateUserData): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || "ADMIN",
      },
    })

    return this.mapToUser(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user ? this.mapToUser(user) : null
  }

  private mapToUser(prismaUser: any): User {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      name: prismaUser.name,
      role: prismaUser.role,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    }
  }

  private mapToUserWithPassword(prismaUser: any): UserWithPassword {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      name: prismaUser.name,
      role: prismaUser.role,
      password: prismaUser.password,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    }
  }
}


export const createUserRepository = (): UserRepository => {
  return new UserRepository()
}
