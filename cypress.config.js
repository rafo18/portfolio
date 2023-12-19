const { defineConfig } = require('cypress');

module.exports = defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
			require('cypress-mochawesome-reporter/plugin')(on);
		},
		viewportHeight:1080,
		viewportWidth:1920,
		
	},
	
	retries: {
		runMode:3,
		openMode:0
	},
	video:false,
	screenshotOnRunFailure:true,
	env: {
		orange:{
			baseUrl:'https://opensource-demo.orangehrmlive.com/web/index.php',
			AdminUser: {
				username: 'Admin',
				password:'admin123'
			}
		},
		spaceBeyond: {
			baseUrl:'https://demo.testim.io'
		},
		swagLabs: {
			baseUrl:'https://www.saucedemo.com',
			AdminUser: {
				username: 'standard_user',
				password:'secret_sauce'
			}
		},
		toolsQa: {
			baseUrl:'https://demoqa.com'
		},
		trello: {
			baseUrl:'https://api.trello.com/1'
		}
	}
});
