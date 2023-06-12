import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(useId: string): Promise<User | null>
  update(data: Prisma.UserUpdateInput): Promise<User>
}
