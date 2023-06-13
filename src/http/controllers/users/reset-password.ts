import { ResourceNotFoundErro } from '@/use-cases/erros/resource-not-found.error'
import { makeResetPasswordUseCase } from '@/use-cases/factories/make-reset-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function resetPassword(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const resetPasswordBodySchema = z.object({
		token: z.string(),
		email: z.string().email(),
		password: z.string()
	})
	const { email, token, password } = resetPasswordBodySchema.parse(request.body)

	try {
		const resetPasswordUseCase = makeResetPasswordUseCase()
		await resetPasswordUseCase.execute({
			email,
			password,
			token
		})
		return reply.status(200).send({ message: 'senha alterada com sucesso.' })
	} catch (error) {
		if (error instanceof ResourceNotFoundErro) {
			return reply.status(400).send({ message: error.message })
		}
		return reply.status(400).send({ message: 'aqui' })
	}
}
