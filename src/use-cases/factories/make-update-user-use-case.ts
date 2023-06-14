import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { updateUserUseCase } from '../update-user'

export function makeUpdateUserUseCase() {
	const userRepository = new PrismaUserRepository()
	const useCase = new updateUserUseCase(userRepository)
	return useCase
}
