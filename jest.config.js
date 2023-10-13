module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'], //match file names including (spec | test).(.js,.jsx,.ts,.tsx)
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // to auto-import jest-dom matchers
};