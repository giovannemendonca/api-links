import { UserRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials.error'
import { randomUUID } from 'crypto'
import { sendEmail } from '@/utils/emailService'

interface ForgotPasswordUseCaseRequest {
  email: string
}

export class ForgotPasswordUseCase {
	constructor(private useRepository: UserRepository) {}

	async execute({ email }: ForgotPasswordUseCaseRequest) {
		const user = await this.useRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}
		const password_reset_token = randomUUID()
		const password_reset_expiry = new Date()

		password_reset_expiry.setHours(password_reset_expiry.getHours() + 1)

		await this.useRepository.forgotPassword(
			email,
			password_reset_token,
			password_reset_expiry
		)

		const sendEmailForgotPassword = new sendEmail()
		await sendEmailForgotPassword.forgotPassword(email, password_reset_token)

		return {
			user
		}
	}
}
