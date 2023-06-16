import { LinkRepository } from '@/repositories/links-repository'
import { UserRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './erros/user-not-found.error'
import { UnauthorizedError } from './erros/unauthorized.error'
import { Link } from '@prisma/client'

interface CreateLinksUseCaseRequest {
  title: string
  description?: string
  url: string
  image_url?: string
  isPublic: boolean
  user_id: string
  use_auth: string
}

interface CreateLinksUseCaseRespose {
  link: Link
}

export class CreateLinkUseCase {
	constructor(
    private linkRepository: LinkRepository,
    private userRepository: UserRepository
	) {}

	async execute(
		data: CreateLinksUseCaseRequest
	): Promise<CreateLinksUseCaseRespose> {
		const { title, description, url, isPublic, image_url, user_id, use_auth } =
      data

		const user = await this.userRepository.findById(user_id)

		if (!user) {
			throw new UserNotFoundError()
		}
		if (user.id !== use_auth) {
			throw new UnauthorizedError()
		}

		const link = await this.linkRepository.create({
			title,
			description,
			url,
			isPublic,
			image_url,
			user_id
		})

		return {
			link
		}
	}
}
