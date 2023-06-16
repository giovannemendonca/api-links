import { PrismaLinkRepository } from '@/repositories/prisma/prisma-links-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteLinkUseCase } from '../delete-link'

export function makeDeleteLinkUseCase() {
	const linksRepository = new PrismaLinkRepository()
	const usersRepository = new PrismaUserRepository()
	const useCase = new DeleteLinkUseCase(linksRepository, usersRepository)
	return useCase
}
