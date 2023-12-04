class ShoppingCart {
	get = {
		title: () => cy.get('.inventory_item_name'),
		desc: () => cy.get('.inventory_item_desc'),
		price: () => cy.get('.inventory_item_price'),
	};
}

export const shoppingCart = new ShoppingCart();
