import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register'

export function makeRegisterUseCase() {
	const useRepository = new PrismaUserRepository()
	const registerUseCase = new RegisterUserUseCase(useRepository)

	return registerUseCase
}
