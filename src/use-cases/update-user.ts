import { UserRepository } from '@/repositories/users-repository'
import { Prisma, User } from '@prisma/client'
import { UserNotFoundError } from './erros/user-not-found.error'

interface UpdateUserUseCaseRequest {
  id: string;
  data: Prisma.UserUpdateInput
}

export class updateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute( {data, id}: UpdateUserUseCaseRequest): Promise<User> {

		const userExists = await this.userRepository.findById(id)

		if (!userExists) {
			throw new UserNotFoundError()
		}

		const user = await this.userRepository.update(id, data)
		
		return user
	}
}