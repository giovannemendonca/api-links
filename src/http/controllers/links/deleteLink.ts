import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found.error'
import { UnauthorizedError } from '@/use-cases/erros/unauthorized.error'
import { UserNotFoundError } from '@/use-cases/erros/user-not-found.error'
import { makeDeleteLinkUseCase } from '@/use-cases/factories/make-delete-link-use-case'
import { z } from 'zod'


export async function deleteLink(request: FastifyRequest, reply: FastifyReply){

	const deleteLinkParamsSchema = z.object({
		link_id: z.string(),
		user_id: z.string()
	})

	const { link_id, user_id } = deleteLinkParamsSchema.parse(request.params)

	const userAuth = request.user.sub
	const deleteLinkUseCase = makeDeleteLinkUseCase()

	try {
		await deleteLinkUseCase.execute({
			link_id,
			user_id,
			userAuth
		})
		reply.status(204).send()

	} catch (error) {
		if(error instanceof UnauthorizedError){
			reply.status(401).send({ message: error.message })
		}
		if(error instanceof ResourceNotFoundError){
			reply.status(404).send({ message: error.message })
		}
		if(error instanceof UserNotFoundError){
			reply.status(404).send({ message: error.message })
		}
		throw new Error('aqui')
	}
}