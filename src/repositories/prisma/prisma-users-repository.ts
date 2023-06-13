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

	async findById(useId: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id: useId
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
}
