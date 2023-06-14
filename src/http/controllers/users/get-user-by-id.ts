import { UserNotFoundError } from '@/use-cases/erros/user-not-found.error'
import { makeGetUserByIdUseCase } from '@/use-cases/factories/make-get-user-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUserById(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const getUserByIdParamsSchema = z.object({
		id: z.string()
	})

	try {
		const { id } = getUserByIdParamsSchema.parse(request.params)
		const getUserByIdUseCase = makeGetUserByIdUseCase()
		const user = await getUserByIdUseCase.execute({ id })

		return reply.status(200).send(user)
	} catch (error) {
		if (error instanceof UserNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		return reply.status(500).send({ message: 'Internal server error' })
	}
}
