import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      baseApiUrl: 'http://localhost:3001',
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },
    specPattern: 'cypress/tests/**/*.cy.ts',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
