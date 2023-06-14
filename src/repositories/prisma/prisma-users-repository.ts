import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
	create(data: Prisma.UserCreateInput): Promise<User> {
		const user = prisma.user.create({
			data
		})
		return user
	}

	findByEmail(email: string): Promise<User | null> {
		const user = prisma.user.findUnique({
			where: {
				email
			}
		})
		return user
	}

	async findById(
		useId: string
	): Promise<Omit<
    User,
    'password_hash' | 'password_reset_token' | 'password_reset_expiry' | 'role'
  > | null> {
		const user = await prisma.user.findUnique({
			where: {
				id: useId
			},
			select: {
				id: true,
				name: true,
				email: true,
				created_at: true,
				updated_at: true
			}
		})
		return user
	}

	async forgotPassword(
		email: string,
		password_reset_token: string,
		password_reset_expiry: Date
	): Promise<User> {
		const user = await prisma.user.update({
			where: {
				email
			},
			data: {
				password_reset_token,
				password_reset_expiry
			}
		})

		return user
	}

	async resetPassword(password_hash: string, email: string): Promise<User> {
		const user = await prisma.user.update({
			where: {
				email
			},
			data: {
				password_hash,
				password_reset_token: null,
				password_reset_expiry: null
			}
		})
		return user
	}

	async listAll(): Promise<
    Omit<
      User,
      | 'password_hash'
      | 'password_reset_token'
      | 'password_reset_expiry'
      | 'role'
    >[]
    > {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				created_at: true,
				updated_at: true
			}
		})

		return users
	}

	async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
		const user = await prisma.user.update({
			where: {
				id
			},
			data
		})
		return user
	}

	async delete(id: string): Promise<User> {
		const user = await prisma.user.delete({
			where: {
				id
			}
		})
		return user
	}
}
