import { Link, Prisma } from '@prisma/client'

export interface LinkRepository{
  create(data: Prisma.LinkUncheckedCreateInput): Promise<Link>
  fetchLinks(id: string): Promise<Link[]>
}