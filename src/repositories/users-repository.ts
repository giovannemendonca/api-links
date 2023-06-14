import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(
    useId: string
  ): Promise<Omit<
    User,
    'password_hash' | 'password_reset_token' | 'password_reset_expiry' | 'role'
  > | null>

  forgotPassword(
    email: string,
    password_reset_token: string,
    password_reset_expiry: Date
  ): Promise<User>
  resetPassword(password_hash: string, email: string): Promise<User>
  listAll(): Promise<
    Omit<
      User,
      | 'password_hash'
      | 'password_reset_token'
      | 'password_reset_expiry'
      | 'role'
    >[]
  >
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>
}
