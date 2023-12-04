class login {
	get = {
		//Login page
		username: () => cy.get('#user-name'),
		password: () => cy.get('#password'),
		button: () => cy.get('#login-button'),

		//PLP
		header: () => cy.get('.primary_header'),
		cardlist: () => cy.get('.inventory_list'),
		cards: () => cy.get('.inventory_item'),

		//errors
		userError: () => cy.get('.error-message-container'),
	};

	fillUsername(val1) {
		this.get.username().clear().type(val1);
		this.get.password().clear();
		this.get.button().click();
	}

	fillPassword(val1) {
		this.get.username().clear();
		this.get.password().clear().type(val1);
		this.get.button().click();
	}

	clickButton() {
		this.get.username().clear();
		this.get.password().clear();
		this.get.button().click();
	}

	fillLogin({ username: val1, password: val2 }) {
		this.get.username().clear().type(val1);
		this.get.password().clear().type(val2);
		this.get.button().click();
	}
}

export const loginPage = new login();
