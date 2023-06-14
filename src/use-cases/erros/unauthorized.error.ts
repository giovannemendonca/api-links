
export class InauthorizedError extends Error {
	constructor() {
		super('You are not allowed to perform this action')
	}
}