import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { forgotPassword } from './forgot-password'
import { resetPassword } from './reset-password'
import { listUsers } from './list-users'
import { getUserById } from './get-user-by-id'

export async function useRoutes(app: FastifyInstance) {
	app
		// Auth
		.post('/auth', authenticate)
		.post('/auth/forgot-password', forgotPassword)
		.post('/auth/reset-password', resetPassword)

		// Users
		.post('/users', register)
		.get('/users', listUsers)
		.get('/users/:id', getUserById)
		
}
