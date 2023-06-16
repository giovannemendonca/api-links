import { PrismaLinkRepository } from '@/repositories/prisma/prisma-links-repository'
import { UpdateLinkUseCase } from '../update-links'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeUpdateLinkUseCase() {
	const linkRepository = new PrismaLinkRepository()
	const userRepository = new PrismaUserRepository()

	const useCase = new UpdateLinkUseCase(linkRepository, userRepository)

	return useCase
}
