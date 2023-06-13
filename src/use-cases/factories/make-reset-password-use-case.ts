import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { ResetPasswordUseCase } from '../reset-password'

export function makeResetPasswordUseCase() {
	const useRepository = new PrismaUserRepository()
	const useCase = new ResetPasswordUseCase(useRepository)

	return useCase
}
