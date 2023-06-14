import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found.error'

interface ListUsersUseCaseResponse {
  users: Partial<User>[]
}

export class ListUsersUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<ListUsersUseCaseResponse> {
		const users = await this.userRepository.listAll()
		if (!users) throw new ResourceNotFoundError()
		return {
			users
		}
	}
}
