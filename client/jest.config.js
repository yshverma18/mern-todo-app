// export default {
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['@testing-library/jest-dom'],
// };

export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  // Remove extensionsToTreatAsEsm: ['.js'] - it's automatic now
  moduleNameMapper: {
    '^(.+)\\.js$': '$1'
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  clearMocks: true
};
