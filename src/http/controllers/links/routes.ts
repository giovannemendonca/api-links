import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createLink } from './create'
import { fetchLinksByUse } from './fetchLinksByUser'

export async function linksRoutes(app: FastifyInstance) {
	app
		.post('/users/:user_id/links', { onRequest: [verifyJwt] }, createLink)
		.get('/users/:user_id/links', fetchLinksByUse)
}
