// Copied from: https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
}

module.exports = createJestConfig(customJestConfig)
