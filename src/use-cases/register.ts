import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlredyExistError } from './erros/user-alredy-exists.error'
import { sendEmail } from '@/utils/emailService'

interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}
interface RegisterUserCaseResponse {
  user: User
}

export class RegisterUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(
		data: RegisterUserCaseRequest
	): Promise<RegisterUserCaseResponse> {
		const { email, name, password } = data
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await this.userRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlredyExistError()
		}

		const user = await this.userRepository.create({
			email,
			name,
			password_hash
		})

		const sendEmailWelcome = new sendEmail()
		await sendEmailWelcome.welcome(email)

		return {
			user
		}
	}
}
