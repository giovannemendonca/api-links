import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface ListUsersUseCaseResponse {
  users: Partial<User>[]
}

export class ListUsersUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<ListUsersUseCaseResponse> {
		const users = await this.userRepository.listAll()
		return {
			users
		}
	}
}
