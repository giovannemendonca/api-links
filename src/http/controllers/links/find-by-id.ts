import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found.error'
import { makeFindLinkByIdUseCase } from '@/use-cases/make-find-link-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
	const findByIdParamsSchema = z.object({
		link_id: z.string()
	})

	const { link_id } = findByIdParamsSchema.parse(request.params)

	try {
		const findByIdUseCase = makeFindLinkByIdUseCase()

		const { link } = await findByIdUseCase.execute({
			id: link_id
		})

		return reply.status(200).send({ link })
	} catch (error) {
		if(error instanceof ResourceNotFoundError){
			return reply.status(400).send({ message: error.message })
		}
		throw error
	}
}
