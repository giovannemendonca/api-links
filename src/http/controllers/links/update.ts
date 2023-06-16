import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found.error'
import { UnauthorizedError } from '@/use-cases/erros/unauthorized.error'
import { UserNotFoundError } from '@/use-cases/erros/user-not-found.error'
import { makeUpdateLinkUseCase } from '@/use-cases/factories/make-update-links-use-case'
import { Prisma } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateLinks(request: FastifyRequest, reply: FastifyReply) {
	const updateLinksParamsSchema = z.object({
		link_id: z.string(),
		user_id: z.string()
	})
	const {link_id, user_id } = updateLinksParamsSchema.parse(request.params)
	const data = request.body as Prisma.LinkUpdateInput
	const authId = request.user.sub

	const linkRepository = makeUpdateLinkUseCase()

	try {
		await linkRepository.execute({
			authId,
			linkId: link_id,
			userId: user_id,
			data
		})
		reply.status(204).send()
	} catch (error) {
		if(error instanceof ResourceNotFoundError){
			return reply.status(404).send({ message: error.message })
		}
		if(error instanceof UserNotFoundError){
			return reply.status(404).send({ message: error.message })
		}
		if(error instanceof UnauthorizedError){
			return reply.status(401).send({ message: error.message })
		}
		throw error
	}
}
