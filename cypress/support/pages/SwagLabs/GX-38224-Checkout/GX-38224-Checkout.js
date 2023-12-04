class Checkout {
	get = {
		title: () => cy.get('.inventory_item_name'),
		desc: () => cy.get('.inventory_item_desc'),
		price: () => cy.get('.inventory_item_price'),
		header: () => cy.get('.complete-header'),
		text: () => cy.get('.complete-text'),

		//form
		firstName: () => cy.get('[data-test="firstName"]'),
		lastName: () => cy.get('[data-test="lastName"]'),
		postalCode: () => cy.get('[data-test="postalCode"]'),
		//buttons
		removeBtn: () => cy.get('[class=cart_item] button'),
		checkoutBtn: () => cy.get('[data-test="checkout"]'),
		continueBtn: () => cy.get('[data-test="continue"]'),
		finishBtn: () => cy.get('[data-test="finish"]'),
		continueShoppingBtn: () => cy.get('[data-test="continue-shopping"]'),
	};
	clickCheckoutBtn() {
		this.get.checkoutBtn().click();
	}
	clickRemoveBtn() {
		this.get.removeBtn().click();
	}
	fillInfo({ firstName: val1, lastName: val2, postalCode: val3 }) {
		this.get.firstName().type(val1);
		this.get.lastName().type(val2);
		this.get.postalCode().type(val3);
		this.get.continueBtn().click();
	}
	clickFinishBtn() {
		this.get.finishBtn().click();
	}
	clickContinueShoppingBtn() {
		this.get.continueShoppingBtn().click();
	}
}

export const checkout = new Checkout();
