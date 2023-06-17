module.exports = {
	preset: 'ts-jest',
	verbose: true,
	detectOpenHandles: true,
	clearMocks: true,
	coverageProvider: 'v8',
	testMatch: ['**/**/*.spec.ts'],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/$1',
	}
}