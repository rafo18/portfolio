const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		viewportHeight:1080,
		viewportWidth:1920,
		
	},
	
	retries:0,
	video:false,
	screenshotOnRunFailure:false,
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
