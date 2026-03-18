export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'], // Ignore E2E tests
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel for JSX
  },
};