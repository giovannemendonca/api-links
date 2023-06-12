import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { ForgotPasswordUseCase } from '../forgot-password'

export function makeForgotPasswordUseCase() {

	const useRepository = new PrismaUserRepository()
	const useCase = new ForgotPasswordUseCase(useRepository)

	return useCase
}