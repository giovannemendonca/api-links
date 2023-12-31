import { Link, Prisma } from '@prisma/client'

export interface LinkRepository{
  create(data: Prisma.LinkUncheckedCreateInput): Promise<Link>
  fetchLinks(userId: string): Promise<Link[] >
  update(id: string, data: Prisma.LinkUpdateInput): Promise<Link>
  findById(id: string): Promise<Link | null>
  delete(id: string): Promise<Link | null>
}