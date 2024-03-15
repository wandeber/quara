export default {
  moduleFileExtensions: [
    "ts",
    "js",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: "tsconfig.json",
    }],
  },
  testMatch: [
    "**/*.test.ts",
    "**/*.spec.ts",
  ],
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!**/node_modules/**",
  ],
};
