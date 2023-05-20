module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(t|j)sx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|scss)$': '<rootDir>/src/tests/mocks/styleMock.js'
    }    
  };