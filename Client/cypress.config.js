const { defineConfig } = require("cypress");

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
    
    },
  },
});