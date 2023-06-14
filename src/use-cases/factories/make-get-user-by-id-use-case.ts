import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserByIdUseCase } from '../get-user-by-id'

export function makeGetUserByIdUseCase() {
	const userRepository = new PrismaUserRepository()
	const userCase = new GetUserByIdUseCase(userRepository)

	return userCase
}
