import { LinkRepository } from '@/repositories/links-repository'
import { ResourceNotFoundError } from './erros/resource-not-found.error'
import { UserRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './erros/user-not-found.error'
import { UnauthorizedError } from './erros/unauthorized.error'

interface DeleteLinkRequest {
  user_id: string;
	link_id: string;
	userAuth: string;
}

export class DeleteLinkUseCase {
	constructor(private readonly linksRepository: LinkRepository, private useRepository: UserRepository) {}

	async execute({ link_id, user_id, userAuth }: DeleteLinkRequest) {
		const link = await this.linksRepository.findById(link_id)
		const user = await this.useRepository.findById(user_id)

		if (!user) {
			throw new UserNotFoundError()
		}
		if (!link) {
			throw new ResourceNotFoundError()
		}
		if (user_id !== userAuth) {
			throw new UnauthorizedError()
		}
		await this.linksRepository.delete(link_id)
	}
}