export default {
  testEnvironment: "jsdom", // enables DOM-like environment
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // mock CSS imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js" // mock image imports
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};