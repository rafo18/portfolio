const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		
	},
	
	retries:0,
	video:false,
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
				username: 'Admin',
				password:'admin123'
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
