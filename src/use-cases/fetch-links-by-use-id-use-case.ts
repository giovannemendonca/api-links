import { Link } from '@prisma/client'


interface FetchLinksByUserId {
  userId: string
}
interface FetchLinksByUserIdResponse {
  links: Link[]
}

export class FetchLinksByUserIdUseCase {
	constructor(private readonly linkRepository: any) {}

	
	
	
}