import { InvalidCredentialsError } from '@/use-cases/erros/invalid-credentials.error'
import { makeForgotPasswordUseCase } from '@/use-cases/factories/make-forgot-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function forgotPassword(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const forgotPasswordBodySchema = z.object({
		email: z.string().email()
	})

	const { email } = forgotPasswordBodySchema.parse(request.body)

	try {
		const forgotPasswordUseCase = makeForgotPasswordUseCase()
		await forgotPasswordUseCase.execute({ email })

		return reply.status(200).send({ message: 'E-mail enviado com sucesso' })
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message })
		}
		throw error
	}
}
