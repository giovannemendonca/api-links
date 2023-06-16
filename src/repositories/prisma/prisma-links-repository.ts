import { Prisma, Link } from '@prisma/client'
import { LinkRepository } from '../links-repository'
import { prisma } from '@/lib/prisma'

export class PrismaLinkRepository implements LinkRepository {
	async create(data: Prisma.LinkUncheckedCreateInput): Promise<Link> {
		const user = await prisma.link.create({
			data
		})
		return user
	}

	async fetchLinks(id: string): Promise<Link[]> {
		const links = await prisma.link.findMany({
			where: {
				user_id: id
			}
		})

		return links
	}
}
