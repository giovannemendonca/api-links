import { FastifyInstance } from 'fastify'
import { createLink } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function linksRoutes(app: FastifyInstance) {
	app.post('/users/:user_id/links', { onRequest: [verifyJwt] }, createLink)
}
