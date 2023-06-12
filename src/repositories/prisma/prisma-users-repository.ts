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
}
