import { elementButtonsPage } from '../../support/pages/ToolsQA/GX-33587-elementsButtons.page';
import { removeLogs } from '../../support/helpers/RemoveLogs';

const toolsQa = Cypress.env('toolsQa');
const { baseUrl } = toolsQa;

describe('GX-33587-🪶ToolsQA | Elements | Buttons', () => {
	beforeEach('Visitar Demo QA', () => {
		cy.visit(`${baseUrl}/buttons`);
		cy.intercept({resourceType: / xhr |fetch/},{log:false})
		cy.url().should('contain','/buttons')
	});

	it('33588 | TC1: Validar desplegar mensaje al hacer doble click izquierdo en el botón “Double Click Me”.', () => {
		elementButtonsPage.doubleClick();
		elementButtonsPage.get.firstMessage().should('exist').and('have.text', 'You have done a double click');
	});

	it('33588 | TC2: Validar desplegar mensaje al hacer click derecho en el botón “Right Click Me“.', () => {
		elementButtonsPage.rigthClick()
		elementButtonsPage.get.secondMessage().should('have.text', 'You have done a right click');
	});

	it('33588 | TC3: Validar desplegar mensaje al hacer click izquierdo en el botón “Click Me“.', () => {
		elementButtonsPage.get.clickMeButton().click();
		elementButtonsPage.get.thirdMessage().should('have.text', 'You have done a dynamic click');
	});
	it('33588 | TC4: Validar NO desplegar mensaje al hacer un click izquierdo en el botón "Double Click Me"', () => {
		elementButtonsPage.get.DoubleClickMeButton().click();
		elementButtonsPage.get.firstMessage().should('not.exist');
	});
	it('33588 | TC5: Validar NO desplegar mensaje al hacer click izquierdo en el botón “Right Click Me“', () => {
		elementButtonsPage.get.rigthClickMeButton().click();
		elementButtonsPage.get.secondMessage().should('not.exist');
	});
	it('33588 | TC6: Validar NO desplegar mensaje al hacer click derecho en el botón “Click Me“', () => {
		elementButtonsPage.get.clickMeButton().rightclick();
		elementButtonsPage.get.thirdMessage().should('not.exist');
	});
});

removeLogs();
