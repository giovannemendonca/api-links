import { InMemoryLinksRepository } from '@/repositories/in-memory/in-memory-links-repository'
import { CreateLinkUseCase } from './create-link'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from './erros/user-not-found.error'
import { UnauthorizedError } from './erros/unauthorized.error'

describe('Create Link', () => {
	let mockLinkRepository: InMemoryLinksRepository
	let mockUserRepository: InMemoryUsersRepository

	let sut: CreateLinkUseCase

	beforeEach(() => {
		mockLinkRepository = new InMemoryLinksRepository()
		mockUserRepository = new InMemoryUsersRepository()
		sut = new CreateLinkUseCase(mockLinkRepository, mockUserRepository)
	})

	it('should be able to create a new link', async () => {
		const user = mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})
		const { link } = await sut.execute({
			title: 'Linkedin',
			isPublic: true,
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
			use_auth: (await user).id,
			user_id: (await user).id
		})

		expect(link).toHaveProperty('id')
		expect(link.title).toBe('Linkedin')
	})

	it('should not be able to create a new link with user not found', async () => {
		await expect(() =>
			sut.execute({
				title: 'Linkedin',
				isPublic: true,
				url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
				use_auth: '123456',
				user_id: '123456'
			})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})

	it('should not be able to create a new link with invalid user_auth', async () => {
		const user = mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})

		await expect(async () =>
			sut.execute({
				title: 'Linkedin',
				isPublic: true,
				url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
				user_id: (await user).id,
				use_auth: '123456'
			})
		).rejects.toBeInstanceOf(UnauthorizedError)
	})
})
