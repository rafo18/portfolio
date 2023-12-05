import { trelloCards } from '../../support/pages/trello(API)/GX2-10969-trello-api-cards-crear-modificar-mover-y-eliminar-tarjetas-de-un-tablero';
import { succes } from '../../fixtures/data/trello(API)/GX2-10969-CRUD.json';
import { faker } from '@faker-js/faker';
const randomCardName = faker.commerce.product();
const randomCardDescription = faker.commerce.productDescription();
let idList1, idList2, idList3;
let idCard;

describe('GX2-10969-trello-api-CRUD', () => {
	before('10970 | PRC: Debe tener las listas Backlog, Active y Done Creadas ', function () {
		trelloCards.createList({ name: 'Done' }).then(({ status, body }) => {
			idList3 = body.id;
			cy.wrap(idList2).as('idList3');
			expect(status).eq(succes);
		});
		trelloCards.createList({ name: 'Active' }).then(({ status, body }) => {
			idList2 = body.id;
			cy.wrap(idList2).as('idList2');
			expect(status).eq(succes);
		});
		trelloCards.createList({ name: 'Backlog' }).then(({ status, body }) => {
			expect(status).eql(succes);
			idList1 = body.id;
			cy.wrap(idList1).as('idList1');
		});
	});

	it('10970 | TC1: Validarr crear una carta en la lista Backlog.', function () {
		trelloCards.createCard({ idList: idList1, cardName: 'Card 1' }).then(({ status, body }) => {
			idCard = body.id;
			cy.wrap(idCard).as('idCard');
			expect(status).eql(succes);
		});
	});

	it('10970 | TC2: Validar modificar la informacion de la card', function () {
		trelloCards
			.updateCard({ idCard: idCard, newCardDescription: randomCardDescription, newCardName: randomCardName })
			.then(({ status, body }) => {
				expect(status).eql(succes);
				expect(body.desc).eql(randomCardDescription);
				expect(body.name).eql(randomCardName);
			});
	});
	it('10970 | TC3: Validar mover la card de la lista Backlog a la lista Active.', function () {
		trelloCards.moveCardToList({ idCard: idCard, idListToMove: idList2 }).then(({ status }) => {
			expect(status).eql(succes);
		});
	});
	it('10970 | TC4: Validar mover la card de la lista Active a la lista Done.', function () {
		trelloCards.moveCardToList({ idCard: idCard, idListToMove: idList3 }).then(({ status }) => {
			expect(status).eql(succes);
		});
	});

	it('10970 | TC5: Validar eliminar la card de la lista Done.', function () {
		trelloCards.deleteCard({ idCard: idCard }).then(({ status }) => {
			expect(status).eql(succes);
		});
	});

	after(() => {
		trelloCards.archiveList({ idList: idList1 });
		trelloCards.archiveList({ idList: idList2 });
		trelloCards.archiveList({ idList: idList3 });
	});
});
