class Plp {
	get = {
		cardContainer: () => cy.get('[class=inventory_item]'),
		title: () => cy.get('.inventory_item_name'),
		description: () => cy.get('[class=inventory_item_desc]'),
		price: () => cy.get('[class=inventory_item_price]'),
		cardBtn: () => cy.get('[class*=btn_inventory ]'),
		cartIcon: () => cy.get('[class=shopping_cart_link]'),
	};

	randomCard() {
		let title;
		let desc;
		let price;
		let randomNumber;

		return this.get
			.cardContainer()
			.then(index => {
				randomNumber = Cypress._.random(0, index.length - 1);

				this.get
					.title()
					.eq(randomNumber)
					.then($title => {
						title = $title.text();
					});
				this.get
					.description()
					.eq(randomNumber)
					.then($des => {
						desc = $des.text();
					});
				this.get
					.price()
					.eq(randomNumber)
					.then($price => {
						price = $price.text();
					});

				this.get.cardBtn().eq(randomNumber).click();
			})
			.then(() => {
				return [title, desc, price, randomNumber];
			});
	}

	clickRandomCard() {
		let title;
		let desc;
		let price;
		let randomNumber;

		return this.get
			.cardContainer()
			.then(index => {
				randomNumber = Cypress._.random(0, index.length - 1);

				this.get
					.title()
					.eq(randomNumber)
					.then($title => {
						title = $title.text();
					});
				this.get
					.description()
					.eq(randomNumber)
					.then($des => {
						desc = $des.text();
					});
				this.get
					.price()
					.eq(randomNumber)
					.then($price => {
						price = $price.text();
					});

				this.get.title().eq(randomNumber).click();
			})
			.then(() => {
				return [title, desc, price, randomNumber];
			});
	}

	cartClick() {
		this.get.cartIcon().click();
	}
}

export const plp = new Plp();
