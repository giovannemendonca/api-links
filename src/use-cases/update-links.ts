import { LinkRepository } from '@/repositories/links-repository'
import { UserRepository } from '@/repositories/users-repository'
import { Link, Prisma } from '@prisma/client'
import { UserNotFoundError } from './erros/user-not-found.error'
import { UnauthorizedError } from './erros/unauthorized.error'
import { ResourceNotFoundError } from './erros/resource-not-found.error'

interface UpdateLinkUSeCaseRequest {
  linkId: string
  userId: string
	authId: string
  data: Prisma.LinkUpdateInput
}

interface UpdateLinkUseCaseResponse {
  links: Link
}

export class UpdateLinkUseCase {
	constructor(
    private linkRepository: LinkRepository,
    private userRepository: UserRepository
	) {}

	async execute({
		linkId: LinkId,
		userId,
		authId,
		data
	}: UpdateLinkUSeCaseRequest): Promise<UpdateLinkUseCaseResponse> {
		const user = await this.userRepository.findById(userId)

	
		if (!user) {
			throw new UserNotFoundError()
		}
		if(authId !== userId){
			throw new UnauthorizedError()
		}
		const links = await this.linkRepository.update(LinkId, data)

		if(!links){
			throw new ResourceNotFoundError()
		}
		console.log(links)
		
		return { 
			links 
		}
	}
}
