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
    })

    return user ? this.mapToUserWithPassword(user) : null
  }

  async create(data: CreateUserData): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })

    return this.mapToUser(user)
  }

  private mapToUser(user: User): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  private mapToUserWithPassword(user: UserWithPassword): UserWithPassword {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}


export const createUserRepository = (): UserRepository => {
  return new UserRepository()
}
