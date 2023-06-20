import { InMemoryLinksRepository } from '@/repositories/in-memory/in-memory-links-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UpdateLinkUseCase } from './update-links'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from './erros/user-not-found.error'
import { UnauthorizedError } from './erros/unauthorized.error'
import { ResourceNotFoundError } from './erros/resource-not-found.error'

describe('Update Link Use Case', () => {
	let mockLinkRepository: InMemoryLinksRepository
	let mockUserRepository: InMemoryUsersRepository

	let sut: UpdateLinkUseCase

	beforeEach(() => {
		mockLinkRepository = new InMemoryLinksRepository()
		mockUserRepository = new InMemoryUsersRepository()
		sut = new UpdateLinkUseCase(mockLinkRepository, mockUserRepository)
	})

	it('should update a link', async () => {
		const user = await mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@axemple.com',
			password_hash: await hash('123456', 8)
		})

		const link = await mockLinkRepository.create({
			title: 'Linkedin',
			isPublic: true,
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
			user_id: user.id
		})

		const updatedLink = await sut.execute({
			authId: user.id,
			userId: user.id,
			linkId: link.id,
			data: {
				description: 'Linkedin do dev'
			}
		})

		expect(updatedLink.links.description).toBe('Linkedin do dev')
	})

	it('should be not able update link by user if user does not exists', async () => {
		const user = await mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@axemple.com',
			password_hash: await hash('123456', 8)
		})

		const link = await mockLinkRepository.create({
			title: 'Linkedin',
			isPublic: true,
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
			user_id: user.id
		})

		await expect(() =>
			sut.execute({
				authId: '123456',
				userId: '123456',
				linkId: link.id,
				data: {
					description: 'Linkedin do dev'
				}
			})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})

	it('should be not able update link by user if User ID and Authenticated User are different', async () => {
		const user = await mockUserRepository.create({
			name: 'john doe',
			email: 'johndoe@axemple.com',
			password_hash: await hash('123456', 8)
		})

		const link = await mockLinkRepository.create({
			title: 'Linkedin',
			isPublic: true,
			url: 'https://www.linkedin.com/in/luiz-felipe-ferreira-oliveira-2b1b0a1b2/',
			user_id: user.id
		})

		await expect(() =>
			sut.execute({
				authId: '123456',
				userId: user.id,
				linkId: link.id,
				data: {
					description: 'Linkedin do dev'
				}
			})
		).rejects.toBeInstanceOf(UnauthorizedError)
	})

	it('should be not able update link by user if Link does not exists', async () => {
		
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

		await expect(() =>
			sut.execute({
				authId: user.id,
				userId: user.id,
				linkId: '123456',
				data: {
					description: 'Linkedin do dev'
				}
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
