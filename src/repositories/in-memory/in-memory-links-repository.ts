import { Prisma, Link } from '@prisma/client'
import { LinkRepository } from '../links-repository'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found.error'

export class InMemoryLinksRepository implements LinkRepository {
	public links: Link[] = []

	async create(data: Prisma.LinkUncheckedCreateInput): Promise<Link> {
		const link: Link = {
			id: String(randomUUID()),
			title: data.title,
			description: data.description || null,
			url: data.url,
			user_id: data.user_id,
			created_at: new Date(),
			image_url: data.image_url || null,
			isPublic: data.isPublic || false
		}
		this.links.push(link)

		return link
	}
	async delete(id: string): Promise<Link | null> {
		const link = this.links.find((link) => link.id === id)

		if (!link) return null

		this.links = this.links.filter((link) => link.id !== id)

		return link
	}

	async findById(id: string): Promise<Link | null> {
		const link = this.links.find((link) => link.id === id)

		if (!link) return null

		return link
	}

	async fetchLinks(userId: string): Promise<Link[]> {
		const links = this.links.filter((link) => link.user_id === userId)
		return links
	}

	async update(id: string, data: Prisma.LinkUpdateInput): Promise<Link> {
		const indexLink = this.links.findIndex((link) => link.id === id)

		if (indexLink === -1) throw new ResourceNotFoundError()

		const link = {
			...this.links[indexLink],
			...data
		}

		this.links[indexLink] = link as Link

		return this.links[indexLink]
	}
}
