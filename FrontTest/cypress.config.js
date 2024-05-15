const { defineConfig } = require("cypress");
const dotenv = require('dotenv');
dotenv.config();

module.exports = defineConfig({
  projectId: "7tauio",
  reporter: 'mochawesome',
  reporterOptions: {
      reportFilename: 'report-cypress',
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true,
  },
  chromeWebSecurity: false,
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      config.env.BASE_URL = 'http://localhost:'
      config.env.CLIENT_PORT = process.env.CLIENT_PORT || 2020
      return config;
    },
  },
});