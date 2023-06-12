import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	JWT_SECRET: z.string(),
	HOST: z.string().default('localhost'),
	DATABASE_URL: z.string(),
	MAILTRAP_HOST: z.string(),
	MAILTRAP_PORT: z.coerce.number(),
	MAILTRAP_USER: z.string(),
	MAILTRAP_PASSWORD: z.string(),
	MAILTRAP_CLIENT_URL: z.string(),
  
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	console.error('Invalid environment variables', _env.error.format())
	throw new Error('Invalid environment variables')
}

export const env = _env.data
