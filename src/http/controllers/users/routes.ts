import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { forgotPassword } from './forgot-password'
import { resetPassword } from './reset-password'
import { listUsers } from './list-users'

export async function useRoutes(app: FastifyInstance) {
	app
		.post('/users', register)
		.post('/auth', authenticate)
		.post('/auth/forgot-password', forgotPassword)
		.post('/auth/reset-password', resetPassword)

		.get('/users', listUsers)
}
