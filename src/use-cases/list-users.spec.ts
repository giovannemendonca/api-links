import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ListUsersUseCase } from './list-users'

describe('List Users USe Case', () => {
	let mockUserRepository: InMemoryUsersRepository
	let sut: ListUsersUseCase

	beforeEach(() => {
		mockUserRepository = new InMemoryUsersRepository()
		sut = new ListUsersUseCase(mockUserRepository)
	})

	it('should be able list users', async () => {
		await mockUserRepository.create({
			name: 'John doe',
			email: 'johndoe@example.com',
			password_hash: '123456'
		})
		await mockUserRepository.create({
			name: 'Maria db',
			email: 'mariadb@example.com',
			password_hash: '123456'
		})

		const { users } = await sut.execute()

		expect(users).toEqual([
			expect.objectContaining({
				name: 'John doe'
			}),
			expect.objectContaining({
				name: 'Maria db'
			})
		])
		expect(users.length).toEqual(2)
	})

})
