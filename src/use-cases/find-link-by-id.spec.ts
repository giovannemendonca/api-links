import { InMemoryLinksRepository } from '@/repositories/in-memory/in-memory-links-repository'
import { FindLinkByIdUseCase } from './find-link-by-id'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './erros/resource-not-found.error'

describe('Find link by ID Use Case', () => {
	let mockLinkRepository: InMemoryLinksRepository
	let mockUserRepository: InMemoryUsersRepository

	let sut: FindLinkByIdUseCase

	beforeEach(() => {
		mockLinkRepository = new InMemoryLinksRepository()
		mockUserRepository = new InMemoryUsersRepository()
		sut = new FindLinkByIdUseCase(mockLinkRepository)
	})

	it('should return a link by ID', async () => {
		const user = await mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@axemple.com',
			password_hash: await hash('123456', 8)
		})

		const linkId = await mockLinkRepository.create({
			title: 'Linkedin',
			isPublic: true,
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
			user_id: user.id
		})
		await mockLinkRepository.create({
			title: 'Github',
			isPublic: true,
			url: 'http://github.com/giovannemendonca',
			user_id: user.id
		})

		const { link } = await sut.execute({
			id: linkId.id
		})

		expect(link.id).toBe(linkId.id)
		expect(link.title).toBe('Linkedin')
	})

	it('should return an error if link does not exists', async () => {
		const user = await mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@axemple.com',
			password_hash: await hash('123456', 8)
		})

		await mockLinkRepository.create({
			title: 'Linkedin',
			isPublic: true,
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
			user_id: user.id
		})

		expect(() => sut.execute({
			id: 'invalid-id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
