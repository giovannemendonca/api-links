import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function useRoutes(app: FastifyInstance) {
	app.post('/users', register)
}
