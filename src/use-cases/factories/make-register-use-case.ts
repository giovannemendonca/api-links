import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register'

export function makeRegisterUseCase() {
	const useRepository = new PrismaUserRepository()
	const useCase = new RegisterUserUseCase(useRepository)

	return useCase
}
