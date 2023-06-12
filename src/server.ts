import { app } from './app'
import { env } from './env'
app
	.listen({
		host: env.HOST,
		port: env.PORT
	})
	.then(() => {
		console.log(`Server listening on ${env.HOST}:${env.PORT}`)
	})
	.catch((err) => {
		console.log('Error starting server', err.message)
	})
