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

	fillUsername({username}) {
		this.get.username().clear().should('be.empty').type(username);
		this.get.password().clear().should('be.empty');
		this.get.button().click();
	}

	fillPassword({password}) {
		this.get.username().clear().should('be.empty');
		this.get.password().clear().should('be.empty').type(password);
		this.get.button().click();
	}

	clickButton() {
		this.get.username().clear();
		this.get.password().clear();
		this.get.button().click();
	}

	Login({ username, password }) {
		this.get.username().clear().should('be.empty').type(username);
		this.get.password().clear().should('be.empty').type(password);
		this.get.button().click();
	}
}

export const loginPage = new login();
