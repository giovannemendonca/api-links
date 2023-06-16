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

	async fetchLinks(user_id: string): Promise<Link[] | null> {
		const links = await prisma.link.findMany({
			where: {
				user_id
			}
		})

		return links
	}

	async update(id: string, data: Prisma.LinkUpdateInput): Promise<Link> {
		const link = await prisma.link.update({
			where: {
				id
			},
			data
		})

		return link
	}
	async findById(id: string): Promise<Link | null> {
		const link = await prisma.link.findUnique({
			where: {
				id
			}
		})
		return link
	}

	async delete(id: string): Promise<void> {
		await prisma.link.delete({
			where: {
				id
			}
		})
	}
}
