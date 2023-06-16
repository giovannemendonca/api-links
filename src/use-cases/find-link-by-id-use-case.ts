import { LinkRepository } from '@/repositories/links-repository'
import { Link } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found.error'

interface FindLinkByIdUseCaseRequest {
  id: string
}

interface FindLinkByIdUseCaseResponse {
  link: Link
}

export class FindLinkByIdUseCase {
	constructor(private readonly linkRespository: LinkRepository) {}

	async execute({
		id
	}: FindLinkByIdUseCaseRequest): Promise<FindLinkByIdUseCaseResponse> {
		const link = await this.linkRespository.findById(id)

		if (!link) {
			throw new ResourceNotFoundError()
		}
		return {
			link
		}
	}
}
