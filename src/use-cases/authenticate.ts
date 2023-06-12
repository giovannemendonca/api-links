import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './erros/invalid-credentials.error'
import { compare } from 'bcryptjs'

interface AutheticateUseCaseRequest {
  email: string
  password: string
}

interface AutheticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
	constructor(private useRepository: UserRepository) {}

	async execute({
		email,
		password
	}: AutheticateUseCaseRequest): Promise<AutheticateUseCaseResponse> {

		const user = await this.useRepository.findByEmail(email)
		
		if (!user) {
			throw new InvalidCredentialsError()
		}
		const doesPasswordMatches = await compare(password, user.password_hash)

		if(!doesPasswordMatches){
			throw new InvalidCredentialsError()
		}
		return {
			user
		}
	}
}
