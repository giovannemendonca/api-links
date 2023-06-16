import { PrismaLinkRepository } from '@/repositories/prisma/prisma-links-repository'
import { FetchLinkByUserUseCase } from '../fetch-links-by-user'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeFetchLinksByUserUseCase() {
	const linkRepository = new PrismaLinkRepository()
	const userRepository = new PrismaUserRepository()
	const useCase = new FetchLinkByUserUseCase(linkRepository, userRepository)

	return useCase
}
