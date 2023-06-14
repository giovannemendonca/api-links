import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found.error'
import { makeListUsersUseCase } from '@/use-cases/factories/make-list-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {

  
	try {
		const listUsersUseCase = makeListUsersUseCase()
		const { users } = await listUsersUseCase.execute()
		return reply.status(200).send(users)
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(400).send({ message: error.message })
		}
		throw error
	}
}
