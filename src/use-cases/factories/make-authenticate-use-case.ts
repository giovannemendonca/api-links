import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {

	const useRepository = new PrismaUserRepository()
	const useCase = new AuthenticateUseCase(useRepository)

	return useCase
}
