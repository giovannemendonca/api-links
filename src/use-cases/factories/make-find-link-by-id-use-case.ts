import { PrismaLinkRepository } from '@/repositories/prisma/prisma-links-repository'
import { FindLinkByIdUseCase } from '../find-link-by-id'

export function makeFindLinkByIdUseCase() {
	const linkRespository = new PrismaLinkRepository()
	const useCase = new FindLinkByIdUseCase(linkRespository)
	return useCase
}