import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotFoundError } from './erros/user-not-found.error'

interface GetUserById {
  id: string
}
interface GetUserByIdResponse {
  user: User
}

export class GetUserByIdUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ id }: GetUserById): Promise<GetUserByIdResponse> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new UserNotFoundError()
		}
		return {
			user
		}
	}
}
