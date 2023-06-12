import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { forgotPassword } from './forgot-password'

export async function useRoutes(app: FastifyInstance) {
	app
		.post('/users', register)
		.post('/auth', authenticate)
		.post('/auth/forgot-password', forgotPassword)
}
