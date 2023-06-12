import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {

	const useRepository = new PrismaUserRepository()
	const authenticateUseCase = new AuthenticateUseCase(useRepository)

	return authenticateUseCase
}
