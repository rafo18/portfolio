import { loginPage } from '../../support/pages/SwagLabs/GX-34535-login';
import data from '../../fixtures/data/SwagLabs/GX-34535-loginData.json';
import { removeLogs } from '../../support/helpers/RemoveLogs';

const swagLabs = Cypress.env('swagLabs');
const { baseUrl, AdminUser } = swagLabs;

describe('GX-34534 | SwagLabs | Account | Iniciar sesión y BR de Accesos', () => {
	beforeEach(() => {
		cy.visit(baseUrl);
	});
	it('34535 | TC1: Validar iniciar sesión con datos validos.', () => {
		loginPage.fillLogin({ username: AdminUser.username, password:AdminUser.password });
		cy.url().should('include', '/inventory.html');
		loginPage.get.header().should('contain.text', 'Swag Labs');
		loginPage.get.cards().should('exist');
	});

	it('34535 | TC2: Validar NO iniciar sesión con usuario bloqueado.', () => {
		loginPage.fillLogin({
			username: data.userName.blocked,
			password: data.password[0].valid,
		});
		loginPage.get.userError().should('exist');
		loginPage.get.userError().should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
	});

	it('34535 | TC3: Validar NO iniciar sesión con usuario no valido.', () => {
		loginPage.fillLogin({
			username: data.userName.invalid,
			password: data.password[1].invalid,
		});
		loginPage.get.userError().should('exist');
		loginPage.get.userError().should('have.text', 'Epic sadface: Username and password do not match any user in this service');
	});

	it('34535 | TC4: Validar NO iniciar sesión con campos vacíos.', () => {
		loginPage.fillUsername(data.userName.valid);
		loginPage.get.userError().should('exist');
		loginPage.get.userError().should('have.text', 'Epic sadface: Password is required');

		loginPage.fillPassword(data.password[0].valid);
		loginPage.get.userError().should('exist');
		loginPage.get.userError().should('have.text', 'Epic sadface: Username is required');

		loginPage.clickButton();
		loginPage.get.userError().should('exist');
		loginPage.get.userError().should('have.text', 'Epic sadface: Username is required');
	});
	
});

removeLogs();
