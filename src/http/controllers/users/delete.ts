import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case'
import { UserNotFoundError } from '@/use-cases/erros/user-not-found.error'
import { z } from 'zod'
import { UnauthorizedError } from '@/use-cases/erros/unauthorized.error'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
	const deleteUserParamsSchema = z.object({
		id: z.string()
	})

	const { id } = deleteUserParamsSchema.parse(request.params)
	const role = request.user.role

	try {
		const deleteUserUseCase = makeDeleteUserUseCase()
		await deleteUserUseCase.execute({ id, role })
		reply.status(204).send()
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return reply.status(404).send({ message: error.message })
		}
		if (error instanceof UserNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		return reply.status(500).send({ message: 'Internal server error' })
	}
}
