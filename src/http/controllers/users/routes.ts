import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function useRoutes(app: FastifyInstance) {
	app
		.post('/users', register)
		.post('/auth', authenticate)
}
