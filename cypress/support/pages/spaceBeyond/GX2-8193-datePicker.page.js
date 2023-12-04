class HomePage {
	get = {
		departingPicker: () => cy.get('[class ^= theme__input] input').eq(0),
		returningPicker: () => cy.get('[class ^= theme__input] input').eq(1),
		adultsPicker: () => cy.get('[class^="theme__dropdown___co-4M"]').eq(0),
		childrenPicker: () => cy.get('[class^="theme__dropdown___co-4M"]').eq(1),
		containerDatePicker: () => cy.get('.Hero__form-box___126DY'),
		selectDestinationButton: () => cy.get('[class^=theme__button___1iKuo ]').eq(0),
		//Pop up calendar
		popUpCalendar: () => cy.get('[class ^= theme__dialog]'),
		inputDatePicker: () => cy.get('[class^=theme__inputElement][class*=theme__inputElement___1oBGc]'),
		calendarDays: () => cy.get('[class^= theme__day___3cb3g]').not('[class$=theme__disabled___2N4Gy]'),
		rightButton: () => cy.get('[id=right]'),
		leftButton: () => cy.get('[id=left]'),
		okButton: () => cy.get('[class^=theme__button___1iKuo ][class$=theme__button___14VKJ]').eq(1),
		month: () => cy.get('[id = months]'),
		//dropdown passenger
		selectPassengers: () => cy.get('[class ^= theme__values___1jS4g][class$= WhiteDropDown__values___3lOeL] li'),
		inputDropdownAdults: () => cy.get('[class^=theme__inputElement___27dyY][class*=WhiteDropDown__inputInputElement___2wTPU ]').eq(0),
		inputDropdownChildren: () => cy.get('[class^=theme__inputElement___27dyY][class*=WhiteDropDown__inputInputElement___2wTPU ]').eq(1),
		//text
		textValidation: () => cy.get('[class = Gallery__headline-2___3amRj]'),
	};
	selectDepartingDate() {
		let departingMonth, departingDay;
		const randomMonth = Cypress._.random(0, 4);
		this.get.departingPicker().click();
		this.get.popUpCalendar().should('be.visible');
		return this.get
			.popUpCalendar()
			.then(() => {
				this.get.popUpCalendar().should('be.visible');
				for (let i = 0; i <= randomMonth - 1; i++) {
					this.get.rightButton().click();
				}
				cy.wait(800);
				this.get.calendarDays().then((index) => {
					const randomDay = Cypress._.random(0, index.length - 1);
					this.get.calendarDays().eq(randomDay).click();
					this.get.month().then((date) => {
						departingMonth = date.text().slice(5, 8);
						departingDay = date.text().slice(9, 11);
					});
					this.get.okButton().click();
				});
			})
			.then(() => {
				return {
					departingMonth: departingMonth,
					departingDay: departingDay,
				};
			});
	}
	selectReturningDate() {
		let returningMonth, returningDay;
		const randomMonth = Cypress._.random(1, 2);
		cy.wait(800);
		this.get.returningPicker().click();
		return this.get
			.popUpCalendar()
			.then(() => {
				this.get.popUpCalendar().should('be.visible');
				for (let i = 0; i <= randomMonth - 1; i++) {
					this.get.rightButton().click();
				}
				cy.wait(800);
				this.get.calendarDays().then((index) => {
					const randomDay = Cypress._.random(0, index.length - 1);
					this.get.calendarDays().eq(randomDay).click();
					this.get.month().then((date) => {
						returningMonth = date.text().slice(5, 8);
						returningDay = date.text().slice(9, 11);
					});
					this.get.okButton().click();
				});
			})
			.then(() => {
				return {
					returningMonth: returningMonth,
					returningDay: returningDay,
				};
			});
	}
	selectAdults() {
		let adultsPassengers;
		this.get.adultsPicker().click();
		this.get.adultsPicker().within(() => {
			this.get.selectPassengers().then((value) => {
				const randomPassenger = Cypress._.random(1, value.length - 1);
				this.get.selectPassengers().eq(randomPassenger).click();
			});
		});
		return this.get
			.inputDropdownAdults()
			.then((data) => {
				adultsPassengers = parseInt(data[0].value);
			})
			.then(() => {
				return adultsPassengers;
			});
	}
	selectChildren() {
		let childrenPassengers;
		this.get.childrenPicker().click();
		this.get.childrenPicker().within(() => {
			this.get.selectPassengers().then((value) => {
				const randomPassenger = Cypress._.random(1, value.length - 1);
				this.get.selectPassengers().eq(randomPassenger).click();
			});
		});
		return this.get
			.inputDropdownChildren()
			.then((data) => {
				childrenPassengers = parseInt(data[0].value);
			})
			.then(() => {
				return childrenPassengers;
			});
	}
	clickOnSelectDestination() {
		this.get.selectDestinationButton().click();
	}
	selectDateAndPassengers() {
		let departingDay, departingMonth, returningMonth, returningDay, adultsPassengers, childrenPassengers;
		return cy
			.get('*')
			.then(() => {
				this.selectDepartingDate().then((date) => {
					departingMonth = date.departingMonth;
					departingDay = date.departingDay;
				});
				this.selectReturningDate().then((date) => {
					returningMonth = date.returningMonth;
					returningDay = date.returningDay;
				});
				this.selectAdults().then((value) => {
					adultsPassengers = value;
				});
				this.selectChildren().then((value) => {
					childrenPassengers = value;
				});
				this.clickOnSelectDestination();
			})
			.then(() => {
				return {
					departingDay: departingDay,
					departingMonth: departingMonth,
					returningDay: returningDay,
					returningMonth: returningMonth,
					adultsPassengers: adultsPassengers,
					childrenPassengers: childrenPassengers,
				};
			});
	}
	selectDepartingAndReturningDate() {
		let departingDay, departingMonth, returningMonth, returningDay;
		return cy
			.get('*')
			.then(() => {
				this.selectDepartingDate().then((date) => {
					departingMonth = date.departingMonth;
					departingDay = date.departingDay;
				});
				this.selectReturningDate().then((date) => {
					returningMonth = date.returningMonth;
					returningDay = date.returningDay;
				});
				this.clickOnSelectDestination();
				this.get.inputDropdownAdults().should('have.value', '1');
			})
			.then(() => {
				return {
					departingDay: departingDay,
					departingMonth: departingMonth,
					returningDay: returningDay,
					returningMonth: returningMonth,
				};
			});
	}

	selectAdultAndChildrenPassengers() {
		let departingDay, departingMonth, returningMonth, returningDay, adultsPassengers, childrenPassengers;
		return cy
			.get('*')
			.then(() => {
				this.selectAdults().then((value) => {
					adultsPassengers = value;
				});
				this.selectChildren().then((value) => {
					childrenPassengers = value;
				});
				this.clickOnSelectDestination();
				this.get
					.inputDatePicker()
					.eq(0)
					.then((value) => {
						departingMonth = value[0].value.slice(3, 6);
						departingDay = parseInt(value[0].value.slice(0, 2));
					});
				this.get
					.inputDatePicker()
					.eq(1)
					.then((value) => {
						returningMonth = value[0].value.slice(3, 6);
						returningDay = parseInt(value[0].value.slice(0, 2));
					});
			})
			.then(() => {
				return {
					departingDay: departingDay,
					departingMonth: departingMonth,
					returningDay: returningDay,
					returningMonth: returningMonth,
					adultsPassengers: adultsPassengers,
					childrenPassengers: childrenPassengers,
				};
			});
	}
	selectSameDepartingAndReturningDate() {
		let departingDay, departingMonth, returningMonth, returningDay ;

		this.get.departingPicker().click();
		this.get.popUpCalendar().should('be.visible');
		return cy
			.get('*')
			.then(() => {
				this.get.popUpCalendar().should('be.visible');
				cy.wait(800);
				this.get.calendarDays().then(() => {
					this.get.calendarDays().eq(0).click();
					this.get.okButton().click();
				});
				this.get.returningPicker().click();
				this.get.popUpCalendar().should('be.visible');
				this.get.popUpCalendar().then(() => {
					this.get.popUpCalendar().should('be.visible');
					cy.wait(800);
					this.get.calendarDays().then(() => {
						this.get.leftButton().click();
						this.get.calendarDays().eq(0).click();
						this.get.month().then((date) => {
							returningMonth = date.text().slice(5, 8);
							returningDay = date.text().slice(9, 11);
						});
						this.get.okButton().click();
					});
				});
				this.clickOnSelectDestination();
				this.get
					.inputDatePicker()
					.eq(0)
					.then((value) => {
						departingMonth = value[0].value.slice(3, 6);
						departingDay = parseInt(value[0].value.slice(0, 2));
					});
			})
			.then(() => {
				return {
					departingDay: departingDay,
					departingMonth: departingMonth,
					returningDay: returningDay,
					returningMonth: returningMonth,
				};
			});
	}
}

export const homePage = new HomePage();
