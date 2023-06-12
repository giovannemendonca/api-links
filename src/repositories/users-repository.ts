import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(useId: string): Promise<User | null>
  forgotPassword(email: string,password_reset_token: string, password_reset_expiry: Date ): Promise<User>
}
