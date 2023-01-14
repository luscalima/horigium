module.exports = {
  preset: "ts-jest",
  globals: {},
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  fakeTimers: {
    enableGlobally: true,
    now: new Date(2023, 0, 1, 8, 30).getTime(),
  },
};
