import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListUsersUseCase } from '../list-users'

export function makeListUsersUseCase() {
	const usersRepository = new PrismaUserRepository()
	const useCase = new ListUsersUseCase(usersRepository)
	return useCase
}
