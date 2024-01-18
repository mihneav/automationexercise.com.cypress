const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com/",
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
