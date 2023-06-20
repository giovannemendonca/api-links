import { InMemoryLinksRepository } from '@/repositories/in-memory/in-memory-links-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { DeleteLinkUseCase } from './delete-link'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './erros/resource-not-found.error'
import { UnauthorizedError } from './erros/unauthorized.error'

describe('Delete Link', () => {
	let mockLinkRepository: InMemoryLinksRepository
	let mockUserRepository: InMemoryUsersRepository

	let sut: DeleteLinkUseCase

	beforeEach(() => {
		mockLinkRepository = new InMemoryLinksRepository()
		mockUserRepository = new InMemoryUsersRepository()
		sut = new DeleteLinkUseCase(mockLinkRepository, mockUserRepository)
	})

	it('should delete a link', async () => {
		const user = await mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})

		const link = await mockLinkRepository.create({
			title: 'LinkedIn',
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-8b5a3a1b3/',
			user_id: user.id,
			description: 'My LinkedIn profile'
		})

		await mockLinkRepository.create({
			title: 'GitHub',
			url: 'github.com/giovannemendonca',
			user_id: user.id,
			description: 'My GitHub profile'
		})

		expect(() =>
			sut.execute({
				link_id: link.id,
				user_id: user.id,
				userAuth: user.id
			})
		).not.toThrow()

		await sut.execute({
			link_id: link.id,
			user_id: user.id,
			userAuth: user.id
		})

		expect(mockLinkRepository.links.length).toEqual(1)
		expect(mockLinkRepository.links[0].title).toEqual('GitHub')
	})

	it('should be able not delete a link if link does not exists', async () => {
		const user = await mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})

		expect(() => sut.execute({
			link_id: 'non-existing-link-id',
			user_id: user.id,
			userAuth: user.id
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

	it('should be able not delete a link if user_id is not equal to userAuth', async () => {

		const user = await mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 8)
		})

		const link = await mockLinkRepository.create({
			title: 'LinkedIn',
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-8b5a3a1b3/',
			user_id: user.id,
			description: 'My LinkedIn profile'
		})

		expect(() => sut.execute({
			link_id: link.id,
			user_id: user.id,
			userAuth: 'non-existing-user-id'
		})).rejects.toBeInstanceOf(UnauthorizedError)
	})

  
})
