module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  modulePathIgnorePatterns: ['<rootDir>/dist/']
};
