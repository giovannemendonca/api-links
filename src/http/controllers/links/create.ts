import { UserNotFoundError } from '@/use-cases/erros/user-not-found.error'
import { makeCreateLinkUseCase } from '@/use-cases/factories/make-create-link-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createLink(request: FastifyRequest, reply: FastifyReply) {
	const createLinkBodySchema = z.object({
		title: z.string(),
		description: z.optional(z.string()),
		url: z.string().url(),
		image_url: z.optional(z.string().url()),
		isPublic: z.boolean()
	})

	const createLinkParamsSchema = z.object({
		user_id: z.string()
	})

	const { 
		title, 
		description, 
		url, 
		image_url, 
		isPublic } = createLinkBodySchema.parse(request.body)
	
	const { user_id } = createLinkParamsSchema.parse(request.params)
	const userAuth = request.user.sub

	try {
		const createLinkUseCase = makeCreateLinkUseCase()
		await createLinkUseCase.execute({
			title,
			description,
			url,
			isPublic,
			image_url,
			user_id,
			use_auth: userAuth
		})
	
		reply.code(201).send()
	} catch (error) {
		if(error instanceof UserNotFoundError){
			reply.code(400).send({ message: error.message })
		}
		throw error
	}
}
