import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found.error'
import { UserNotFoundError } from '@/use-cases/erros/user-not-found.error'
import { makeFetchLinksByUserUseCase } from '@/use-cases/factories/make-fetch-links-by-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchLinksByUse(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const fetchLinksParamsSchema = z.object({
		user_id: z.string()
	})

	const { user_id } = fetchLinksParamsSchema.parse(request.params)

	try {
		const fetchLinks = makeFetchLinksByUserUseCase()

		const links = await fetchLinks.execute({
			user_id
		})

		return reply.status(200).send(links)
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(400).send({ message: error.message })
		}
		if(error instanceof UserNotFoundError){
			return reply.status(200).send({message: error.message})
		}
		throw error
	}
}
