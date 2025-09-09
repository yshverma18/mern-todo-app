export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testTimeout: 30000,
  forceExit: true,
  detectOpenHandles: true
};
