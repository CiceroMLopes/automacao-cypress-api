const { defineConfig } = require('cypress');

module.exports = defineConfig({
	video: false,
	e2e: {
		baseUrl: process.env.CYPRESS_BASE_URL || 'https://serverest.dev',
		specPattern: 'cypress/e2e/**/*.cy.js',
		supportFile: 'cypress/support/e2e.js',
		chromeWebSecurity: false,
	},
	reporter: 'mochawesome',
	reporterOptions: {
		reportDir: 'cypress/reports',
		overwrite: false,
		html: false,
		json: true
	}
});