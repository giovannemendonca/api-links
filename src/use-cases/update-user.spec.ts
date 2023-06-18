import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { updateUserUseCase } from './update-user'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from './erros/user-not-found.error'

describe('Update User useCase', () => {
	let mockUserRepository: InMemoryUsersRepository
	let sut: updateUserUseCase

	beforeEach(() => {
		mockUserRepository = new InMemoryUsersRepository()
		sut = new updateUserUseCase(mockUserRepository)
	})

	it('should be able update user', async () => {
		const user = await mockUserRepository.create({
			name: 'John Doe',
			email: 'johnDoedoe@example.com',
			password_hash: await hash('123456', 8)
		})

		const userUpdate = await sut.execute({
			id: user.id,
			data: {
				name: 'Mary Doe'
			}
		})
		expect(userUpdate.name).toBe('Mary Doe')
	})

	it('should not be able update user if user not exists', async () => {

		await expect(() => sut.execute({
			id: '123456',
			data: {
				name: 'Mary Doe'
			}
		})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})

})
