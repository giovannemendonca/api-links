import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createLink } from './create'
import { fetchLinksByUse } from './fetchLinksByUser'
import { updateLinks } from './update'

export async function linksRoutes(app: FastifyInstance) {
	app
		.get('/users/:user_id/links', fetchLinksByUse)

		.post('/users/:user_id/links', { onRequest: [verifyJwt] }, createLink)
		.patch('/users/:user_id/links/:link_id', { onRequest: [verifyJwt] }, updateLinks)
}
