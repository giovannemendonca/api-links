import { Prisma, Link } from '@prisma/client'
import { LinkRepository } from '../links-repository'
import { prisma } from '@/lib/prisma'

export class PrismaLinkRepository implements LinkRepository {
	create(data: Prisma.LinkUncheckedCreateInput): Promise<Link> {
		
		const user = prisma.link.create({
			data
		})
		return user
	}
}
