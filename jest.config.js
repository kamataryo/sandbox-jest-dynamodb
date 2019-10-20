module.exports = {
  preset: '@shelf/jest-dynamodb',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  testMatch: ['<rootDir>/src/**/*.test.ts']
}
