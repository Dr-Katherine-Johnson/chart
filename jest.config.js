module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}'
  ],
  coverageDirectory: 'coverage'
}