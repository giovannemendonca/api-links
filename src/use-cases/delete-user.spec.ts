import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { DeleteUserUseCase } from './delete-user'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from './erros/user-not-found.error'
import { UnauthorizedError } from './erros/unauthorized.error'

describe('Delete User useCase', () => {
	let mockUserRepository: InMemoryUsersRepository
	let sut: DeleteUserUseCase

	beforeEach(() => {
		mockUserRepository = new InMemoryUsersRepository()
		sut = new DeleteUserUseCase(mockUserRepository)
	})

	it('should be able delete user', async () => {
		const user = await mockUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})

		await sut.execute({
			id: user.id,
			role: 'ADMIN'
		})
		expect(mockUserRepository.users.length).toBe(0)
		expect(mockUserRepository.users).toEqual([])
	})

	it('should not be able delete user if user not exists', async () => {
		await expect(
			sut.execute({
				id: '123456',
				role: 'ADMIN'
			})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})

	it('should not be able delete user if user is not admin', async () => {
		const user = await mockUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})

		await expect(() =>
			sut.execute({
				id: user.id,
				role: 'USER'
			})
		).rejects.toBeInstanceOf(UnauthorizedError)
	})
})
