import { UserNotFoundError } from '@/use-cases/erros/user-not-found.error'
import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'
import { Prisma } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
	const updateUserParamsSchema = z.object({
		id: z.string()
	})

	const updateUserUseCase = makeUpdateUserUseCase()

	const { id } = updateUserParamsSchema.parse(request.params)
	const data = request.body as Prisma.UserUpdateInput

	const tokenUserId = request.user.sub

	if (id !== tokenUserId) {
		return reply.status(403).send({ message: 'Forbidden' })
	}

	try {
		updateUserUseCase.execute({
			id,
			data
		})
	} catch (error) {
		if (error instanceof UserNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		return reply.status(500).send('Internal Server Error')
	}
}
