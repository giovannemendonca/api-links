import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { InvalidTokenError } from './erros/invalid-token.error'
import { ResourceNotFoundError } from './erros/resource-not-found.error'
import { ExpiedTokenError } from './erros/expired-token.error'

interface ResetPasswordRequest {
  email: string
  token: string
  password: string
}

export class ResetPasswordUseCase {
	constructor(private useRepository: UserRepository) {}

	async execute({ email, password, token }: ResetPasswordRequest) {
		const user = await this.useRepository.findByEmail(email)

		const password_hash = await hash(password, 6)
		const now = new Date()

		if (!user) {
			throw new ResourceNotFoundError()
		}
		if (!user.password_reset_expiry || !user.password_reset_token) {
			throw new ResourceNotFoundError()
		}
		if (user.password_reset_token !== token) {
			throw new InvalidTokenError()
		}

		if (now > user.password_reset_expiry) {
			throw new ExpiedTokenError()
		}
		this.useRepository.resetPassword(password_hash, email)
		return
	}
}
