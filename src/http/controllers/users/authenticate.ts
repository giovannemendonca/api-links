import { InvalidCredentialsError } from '@/use-cases/erros/invalid-credentials.error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6)
	})

	const { email, password } = authenticateBodySchema.parse(request.body)
	try {
		const authenticateUseCase = makeAuthenticateUseCase()
		
		const { user } = await authenticateUseCase.execute({
			email,
			password
		})
		
		const token = await reply.jwtSign(
			{
				role: user.role
			},
			{
				sign: {
					sub: user.id,
					expiresIn: '1d'
				}
			}
		)

		return reply.status(200).send({
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				
			}
		})
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: err.message })
		}
		throw new Error('Unexpected error')
	}
}
