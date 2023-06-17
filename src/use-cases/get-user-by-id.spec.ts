import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserByIdUseCase } from './get-user-by-id'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from './erros/user-not-found.error'

describe('Get User By Id Use Case', () => {

	let mockUserRepository: InMemoryUsersRepository
	let sut: GetUserByIdUseCase

	beforeEach(() => {
		mockUserRepository = new InMemoryUsersRepository()
		sut = new GetUserByIdUseCase(mockUserRepository)
	})


	it('should be able get user by id', async () => {
		const user = await mockUserRepository.create({
			name: 'John doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})

		const response = await sut.execute({
			id: user.id
		})
		expect(response.user.id).toEqual(user.id)
		expect(response.user.name).toEqual(user.name)
	})

	it('should not be able get user by id if user not exists', async () =>{
		await expect(sut.execute({
			id: '123'
		})).rejects.toBeInstanceOf(UserNotFoundError)

	} )
})