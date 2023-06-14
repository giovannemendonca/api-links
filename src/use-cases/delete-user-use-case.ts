import { UserRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './erros/user-not-found.error'
import { InauthorizedError } from './erros/unauthorized.error'

interface DeleteUserUseCaseRequest {
  id: string;
	role: string;
}

export class DeleteUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute({id, role}: DeleteUserUseCaseRequest): Promise<void> {
		
		console.log('role', role)

		if (role !== 'ADMIN') {
			throw new InauthorizedError()
		}

		const user = await this.userRepository.findById(id)
		if (!user) {
			throw new UserNotFoundError()
		}

		await this.userRepository.delete(id)
		
	}
}