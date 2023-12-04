
class Login {
	get = {
		//Login
		username: () => cy.get('#user-name'),
		password: () => cy.get('#password'),
		submitBtn: () => cy.get('#login-button'),
		//PLP
		cardBtn: () => cy.get('[class*=btn_primary ]'),
	};

	login({ username,password }) {
		this.get.username().type(username);
		this.get.password().type(password);
		this.get.submitBtn().click();
	}
	randomNumber({ min = 0, max = val }) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}

export const loginPage = new Login();
