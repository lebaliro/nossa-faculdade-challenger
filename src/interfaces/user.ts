export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface UserWithPassword extends User {
  password: string
}

export interface CreateUserData {
  name: string
  email: string
  password: string
}

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  findByEmailWithPassword(email: string): Promise<UserWithPassword | null>
  create(data: CreateUserData): Promise<User>
}
