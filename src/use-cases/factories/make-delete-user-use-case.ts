import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../delete-user'

export function makeDeleteUserUseCase() {
	const usersRepository = new PrismaUserRepository()

	const useCase = new DeleteUserUseCase(usersRepository)

	return useCase
}