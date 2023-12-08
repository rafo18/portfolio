class ElementButtonsPage {
	get = {
		DoubleClickMeButton: () => cy.get('[class="btn btn-primary"]').eq(0),
		rigthClickMeButton: () => cy.get('[class="btn btn-primary"]').eq(1),
		clickMeButton: () => cy.get('[class="btn btn-primary"]').eq(2),
		firstMessage: () => cy.get('#doubleClickMessage'),
		secondMessage: () => cy.get('#rightClickMessage'),
		thirdMessage: () => cy.get('#dynamicClickMessage'),
	};

	doubleClick(){
		this.get.DoubleClickMeButton().dblclick()
	}

	rigthClick(){
		this.get.rigthClickMeButton().rightclick();
	}


}

export const elementButtonsPage = new ElementButtonsPage();
