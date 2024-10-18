const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app directory
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // For setting up testing environment
  moduleNameMapper: {
    // Handle module aliases (matching the paths in tsconfig.json if using TypeScript)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
