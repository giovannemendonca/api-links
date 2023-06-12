import { UserRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials.error'
import { randomUUID } from 'crypto'

interface ForgotPasswordUseCaseRequest{
  email: string
}

export class ForgotPasswordUseCase{

	constructor(private useRepository: UserRepository){}

	async execute({email}: ForgotPasswordUseCaseRequest){
    
		const user = await this.useRepository.findByEmail(email)

		if(!user){
			throw new InvalidCredentialsError()
		}
		const token = randomUUID()
		console.log(token)

	}
}