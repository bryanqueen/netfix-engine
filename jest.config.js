const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['C:/Users/USER/Desktop/projects/netfix-engine/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': 'C:/Users/USER/Desktop/projects/netfix-engine/src/components/$1',
    '^@/context/(.*)$': 'C:/Users/USER/Desktop/projects/netfix-engine/src/context/$1',
    '^@/types/(.*)$': 'C:/Users/USER/Desktop/projects/netfix-engine/src/types/$1',
  }
}

module.exports = createJestConfig(customJestConfig) 