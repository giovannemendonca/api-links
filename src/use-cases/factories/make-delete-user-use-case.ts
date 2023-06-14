import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../delete-user-use-case'

export function makeDeleteUserUseCase() {
	const usersRepository = new PrismaUserRepository()

	const useCase = new DeleteUserUseCase(usersRepository)

	return useCase
}