import { loginPage } from '../../support/pages/SwagLabs/GX-34846-agregarProductosAlCart/GX-34846-Login';
import { productListPage } from '../../support/pages/SwagLabs/GX-34846-agregarProductosAlCart/GX-34846-PLP';
import { productDetailPage } from '../../support/pages/SwagLabs/GX-34846-agregarProductosAlCart/GX-34846-PDP';
import { shoppingCartPage } from '../../support/pages/SwagLabs/GX-34846-agregarProductosAlCart/GX-34846-ShoppingCart';

import { removeLogs } from '../../support/helpers/RemoveLogs';

const swagLabs = Cypress.env('swagLabs');
const { baseUrl, AdminUser } = swagLabs;

describe('GX-34846-SwagLabs | SCP | Agregar producto al carrito de compras desde el PLP o PDP', () => {
	beforeEach(() => {
		cy.visit(baseUrl);
		loginPage.login({
			username:AdminUser.username,
			password:AdminUser.password
		});
	});

	it('34847 | TC1: Validar agregar producto desde el PLP', () => {
		productListPage.randomCard().then(index => {
			const [title, desc, price, random] = index;
			productListPage.get.cartIcon().should('have.text', '1');
			productListPage.get.cardBtn().eq(random).should('have.text', 'Remove');
			productListPage.cartClick();
			shoppingCartPage.get.title().should('have.text', title);
			shoppingCartPage.get.desc().should('have.text', desc);
			shoppingCartPage.get.price().should('have.text', price);
		});
	});

	it('34847 | TC2: Validar agregar producto desde el PDP', () => {
		productListPage.clickRandomCard();
		productDetailPage.addToCart().then(index => {
			const [title, desc, price] = index;
			productDetailPage.get.cartIcon().should('have.text', '1');
			productDetailPage.get.button().should('have.text', 'Remove');
			productDetailPage.cartClick();
			shoppingCartPage.get.title().should('have.text', title);
			shoppingCartPage.get.desc().should('have.text', desc);
			shoppingCartPage.get.price().should('have.text', price);
		});
	});
});

removeLogs();
