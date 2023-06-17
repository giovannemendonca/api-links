import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUserUseCase } from '@/use-cases/register'
import { UserAlredyExistError } from './erros/user-alredy-exists.error'

describe('Register User', () => {
	let mockUserRepository: InMemoryUsersRepository
	let sut: RegisterUserUseCase

	beforeEach(() => {
		mockUserRepository = new InMemoryUsersRepository()
		sut = new RegisterUserUseCase(mockUserRepository)
	})

	it('Should be able to register a new user', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'johnDoedoe@example.com',
			password: '123456'
		})
		expect(user).toHaveProperty('id')
	})

	it('Should not be able to register a new user with email exists', async () => {
		const email = 'johnDoedoe@example.com'

		await sut.execute({
			name: 'John Doe',
			email,
			password: '123456'
		})

		await expect(() => {
			return sut.execute({
				name: 'John Doe',
				email,
				password: '123456'
			})
		}).rejects.toBeInstanceOf(UserAlredyExistError)
	})
})
