module.exports = {
  bail: 0,
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageProvider: 'v8',
  globals: { 'ts-jest': { diagnostics: false } },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)']
}
