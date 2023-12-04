class Pdp {
	get = {
		cardContainer: () => cy.get('[class=inventory_details_container]'),
		cartIcon: () => cy.get('[class=shopping_cart_link]'),
		title: () => cy.get('[class*=inventory_details_name]'),
		desc: () => cy.get('[class=inventory_details_desc_container] [class*=inventory_details_desc]'),
		price: () => cy.get('[class*=inventory_details_price]'),
		button: () => cy.get('[class*=btn_inventory]'),
	};

	addToCart() {
		let title;
		let desc;
		let price;

		return this.get
			.cardContainer()
			.then(index => {
				this.get.title().then($title => {
					title = $title.text();
				});
				this.get.desc().then($desc => {
					desc = $desc.text();
				});
				this.get.price().then($price => {
					price = $price.text();
				});
				this.get.button().click();
			})
			.then(() => {
				return [title, desc, price];
			});
	}

	cartClick() {
		this.get.cartIcon().click();
	}
}

export const pdp = new Pdp();
