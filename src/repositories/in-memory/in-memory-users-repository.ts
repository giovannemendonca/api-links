import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UserRepository {
	public users: User[] = []

	async create(data: Prisma.UserCreateInput) {
		
		const user: User = {
			id: String(randomUUID()),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			password_reset_token: null,
			role: 'ADMIN',
			password_reset_expiry: new Date(),
			created_at: new Date(),
			updated_at: new Date()
		}
		this.users.push(user)

		return user
	}

	async findByEmail(email: string) {
		const user =  this.users.find((user) => user.email === email)

		if(!user) {
			return null
		}
		return user
	}

	async findById(useId: string): Promise<Omit<
    User,
    'password_hash' | 'password_reset_token' | 'password_reset_expiry' | 'role'
  > | null> {
		
		const user = this.users.find((user) => user.id === useId)

		if(!user) {
			return null
		}

		return user
	}


	forgotPassword(
		email: string,
		password_reset_token: string,
		password_reset_expiry: Date
	): Promise<User> {
		throw new Error('Method not implemented.')
	}
	resetPassword(password_hash: string, email: string): Promise<User> {
		throw new Error('Method not implemented.')
	}
	async	listAll(): Promise<
    Omit<
      User,
      | 'password_hash'
      | 'password_reset_token'
      | 'password_reset_expiry'
      | 'role'
    >[]
    > {
		return this.users
	}

	update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
		throw new Error('Method not implemented.')
	}
	delete(id: string): Promise<User> {
		throw new Error('Method not implemented.')
	}
}
