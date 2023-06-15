
export class UnauthorizedError extends Error {
	constructor() {
		super('You are not allowed to perform this action')
	}
}