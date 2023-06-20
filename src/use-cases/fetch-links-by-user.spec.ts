import { InMemoryLinksRepository } from '@/repositories/in-memory/in-memory-links-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { FetchLinkByUserUseCase } from './fetch-links-by-user'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from './erros/user-not-found.error'

describe('Fetch links by user Use Case', () => {
	let mockLinkRepository: InMemoryLinksRepository
	let mockUserRepository: InMemoryUsersRepository

	let sut: FetchLinkByUserUseCase

	beforeEach(() => {
		mockLinkRepository = new InMemoryLinksRepository()
		mockUserRepository = new InMemoryUsersRepository()
		sut = new FetchLinkByUserUseCase(mockLinkRepository, mockUserRepository)
	})

	it('should be able to fetch links by user', async () => {
		const user = mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})
		await mockLinkRepository.create({
			title: 'Linkedin',
			isPublic: true,
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
			user_id: (await user).id
		})
		await mockLinkRepository.create({
			title: 'Github',
			isPublic: true,
			url: 'https://github.com/giovannemendonca',
			user_id: (await user).id
		})
		await mockLinkRepository.create({
			title: 'GitLab',
			isPublic: true,
			url: 'https://gitlab.com/giovannemendonca',
			user_id: 'another-user-id'
		})

		const { links } = await sut.execute({
			user_id: (await user).id
		})
		
		expect(links.length).toBe(2)
		expect(links[0].title).toBe('Linkedin')
		expect(links[1].title).toBe('Github')


	})

	it('should not be able to fetch links by user if user does not exists', async () => {
		const user = mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})
		await mockLinkRepository.create({
			title: 'Linkedin',
			isPublic: true,
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
			user_id: (await user).id
		})

		await expect(() =>
			sut.execute({
				user_id: 'non-existing-user-id'
			})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})
})
