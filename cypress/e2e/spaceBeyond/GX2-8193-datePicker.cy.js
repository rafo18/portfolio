import { removeLogs } from '../../support/helpers/RemoveLogs';
import { homePage } from '../../support/pages/spaceBeyond/GX2-8193-datePicker.page';

const spaceBeyond = Cypress.env('spaceBeyond');
const { baseUrl } = spaceBeyond;

describe('GX2-8193-SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach(() => {
		cy.visit(baseUrl);
		cy.url().should('contain', 'demo.testim.io/');
	});
	it('GX2-8194 | TC1: Validar buscar destino por fecha de partida, fecha de retorno y tipo de pasajero.', () => {
		let departingDay, departingMonth, returningMonth, returningDay, adultsPassengers, childrenPassengers, totalPassengers;
		homePage.selectDateAndPassengers().then((data) => {
			departingDay = data.departingDay;
			departingMonth = data.departingMonth;
			returningDay = data.returningDay;
			returningMonth = data.returningMonth;
			adultsPassengers = data.adultsPassengers;
			childrenPassengers = data.childrenPassengers;
			totalPassengers = adultsPassengers + childrenPassengers;
			if (departingMonth === returningMonth) {
				homePage.get.textValidation().should('have.text', `${totalPassengers} travelers, ${departingMonth} ${departingDay} – ${returningDay}`);
			} else {
				homePage.get
					.textValidation()
					.should('have.text', `${totalPassengers} travelers, ${departingMonth} ${departingDay} – ${returningMonth} ${returningDay}`);
			}
		});
	});
	it.skip('GX2-8194 | TC2: Validar buscar destino por fecha de partida y fecha de retorno.', () => {
		let departingDay, departingMonth, returningMonth, returningDay;
		homePage.selectDepartingAndReturningDate().then((data) => {
			departingDay = data.departingDay;
			departingMonth = data.departingMonth;
			returningDay = data.returningDay;
			returningMonth = data.returningMonth;
			if (departingMonth === returningMonth) {
				homePage.get.textValidation().should('have.text', `1 traveler, ${departingMonth} ${departingDay} – ${returningDay}`);
			} else {
				homePage.get.textValidation().should('have.text', `1 traveler, ${departingMonth} ${departingDay} – ${returningMonth} ${returningDay}`);
			}
		});
	});
	it('GX2-8194 | TC3: Validar buscar destino por cantidad y tipo de pasajero.', () => {
		let departingDay, departingMonth, returningMonth, returningDay, adultsPassengers, childrenPassengers, totalPassengers;
		homePage.selectAdultAndChildrenPassengers().then((data) => {
			departingDay = data.departingDay;
			departingMonth = data.departingMonth;
			returningDay = data.returningDay;
			returningMonth = data.returningMonth;
			adultsPassengers = data.adultsPassengers;
			childrenPassengers = data.childrenPassengers;
			totalPassengers = adultsPassengers + childrenPassengers;
			if (departingMonth === returningMonth) {
				homePage.get.textValidation().should('have.text', `${totalPassengers} travelers, ${departingMonth} ${departingDay} – ${returningDay}`);
			} else {
				homePage.get
					.textValidation()
					.should('have.text', `${totalPassengers} travelers, ${departingMonth} ${departingDay} – ${returningMonth} ${returningDay}`);
			}
		});
	});
	it('GX2-8194 | TC4: Validar buscar destino por misma fecha de partida y retorno.', () => {
		let departingDay, departingMonth, returningMonth, returningDay;
		homePage.selectSameDepartingAndReturningDate().then((data) => {
			departingDay = data.departingDay;
			departingMonth = data.departingMonth;
			returningDay = data.returningDay;
			returningMonth = data.returningMonth;
			if (departingMonth === returningMonth) {
				homePage.get.textValidation().should('have.text', `1 traveler, ${departingMonth} ${departingDay} – ${returningDay}`);
			} else {
				homePage.get.textValidation().should('have.text', `1 traveler, ${departingMonth} ${departingDay} – ${returningMonth} ${returningDay}`);
			}
		});
	});
});

removeLogs();
