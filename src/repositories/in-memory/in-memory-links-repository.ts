import { Prisma, Link } from '@prisma/client'
import { LinkRepository } from '../links-repository'
import { randomUUID } from 'crypto'


export class InMemoryLinksRepository implements LinkRepository{

	public links: Link[] = []

	async	create(data: Prisma.LinkUncheckedCreateInput): Promise<Link> {
		const link: Link = {
			id: String(randomUUID()),
			title: data.title,
			description: data.description || null,
			url: data.url,
			user_id: data.user_id,
			created_at: new Date(),
			image_url: data.image_url || null,
			isPublic: data.isPublic || false,
		}
		this.links.push(link)

		return link
	}

  
	fetchLinks(userId: string): Promise<Link[] | null> {
		throw new Error('Method not implemented.')
	}
	update(id: string, data: Prisma.LinkUpdateInput): Promise<Link> {
		throw new Error('Method not implemented.')
	}
	findById(id: string): Promise<Link | null> {
		throw new Error('Method not implemented.')
	}
	delete(id: string): Promise<void> {
		throw new Error('Method not implemented.')
	}

}