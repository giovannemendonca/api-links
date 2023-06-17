import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials.error'

describe('Authenticate Use Case', () => {
	let mockUserRepository: InMemoryUsersRepository
	let sut: AuthenticateUseCase

	beforeEach(() => {
		mockUserRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(mockUserRepository)
	})

	it('should be able authenticate', async () => {
		await mockUserRepository.create({
			name: 'John Doe',
			email: 'johnDoedoe@example.com',
			password_hash: await hash('123456', 8)
		})
		const { user } = await sut.execute({
			email: 'johnDoedoe@example.com',
			password: '123456'
		})
		expect(user).toHaveProperty('id')
		expect(user.name).toBe('John Doe')
	})

	it('should not be able authenticate with non existing user', async () => {
		await expect(() => {
			return sut.execute({
				email: 'johnDoedoe@example.com',
				password: '123456'
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able authenticate with wrong password', async () => {
		await mockUserRepository.create({
			name: 'John Doe',
			email: 'johnDoedoe@example.com',
			password_hash: await hash('123456', 8)
		})

		await expect(() => {
			return sut.execute({
				email: 'johnDoedoe@example.com',
				password: 'eeeeee'
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
