import { LinkRepository } from '@/repositories/links-repository'
import { Link } from '@prisma/client'
import { UserRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './erros/user-not-found.error'

interface FetchLinksByUserRequest {
  user_id: string
}

interface FetchLinksUseCaseResponse {
  links: Link[] 
}

export class FetchLinkByUserUseCase {
	constructor(private linkRepository: LinkRepository, private useRepository: UserRepository) {}

	async execute({
		user_id
	}: FetchLinksByUserRequest): Promise<FetchLinksUseCaseResponse> {

		const hasUser = await this.useRepository.findById(user_id)

		if(!hasUser){
			throw new UserNotFoundError()
		}

		const links = await this.linkRepository.fetchLinks(user_id)


		return {
			links
		}
	}
}
