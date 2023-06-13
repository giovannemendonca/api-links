export class ExpiedTokenError extends Error {
	constructor(){
		super('Expired-token')
	}
}