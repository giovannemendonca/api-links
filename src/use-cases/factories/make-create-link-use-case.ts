import { PrismaLinkRepository } from '@/repositories/prisma/prisma-links-repository'
import { CreateLinkUseCase } from '../create-link-use-case'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'


export function makeCreateLinkUseCase() {
	const linkRepository = new PrismaLinkRepository()
	const useRepository = new PrismaUserRepository()
	const useCase =  new CreateLinkUseCase(linkRepository, useRepository)

	return useCase
}