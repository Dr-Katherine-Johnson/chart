module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  clearMocks: true,
  collectCoverageFrom: [
    'client/src/**/*.{js,jsx}'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}