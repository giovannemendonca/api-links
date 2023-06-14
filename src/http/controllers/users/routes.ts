import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'
import { forgotPassword } from './forgot-password'
import { resetPassword } from './reset-password'
import { listUsers } from './list-users'
import { getUserById } from './get-user-by-id'
import { updateUser } from './update-user'
import { deleteUser } from './delete'

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
	
		/** Authenticated */
		.patch('/user/:id', { onRequest: [verifyJwt] }, updateUser)

	app.delete('/user/:id', { onRequest: [verifyJwt] }, deleteUser)
		
}
