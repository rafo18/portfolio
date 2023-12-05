import { trelloCards } from '../../support/pages/trello(API)/GX2-10188-trello-api-cards-api-endpoint-mover-y-archivar-todas-las-tarjetas-de-una-lista.page';
import { succes } from '../../fixtures/data/trello(API)/GX2-10188-trello-mover-archivar.json';

let idList1;
let idList2;
describe('GX2-10188-trello-api-cards-api-endpoint-mover-y-archivar-todas-las-tarjetas-de-una-lista', () => {
	before('10189 | PRC: Debe tener al menos 2 listas y varias cards dentro de una lista ', function () {
		trelloCards.createList({ name: 'Active' }).then(({ status, body }) => {
			expect(status).eq(succes);
			idList2 = body.id;
			cy.wrap(idList2).as('idList2');
		});
		trelloCards
			.createList({ name: 'Backlog' })
			.then(({ status }) => {
				expect(status).eql(succes);
			})
			.then(({ body }) => {
				idList1 = body.id;
				cy.wrap(idList1).as('idList1');
				trelloCards.createCard({ numberOfCards: 3, idList: idList1 });
			});
	});

	it('10189 | TC1: Validar mover todas las cards de la tabla Backlog a la tabla Active.', function () {
		trelloCards.moveAllCardsToAList({ currentIdList: idList1, newIdList: idList2 }).then(({ status }) => {
			expect(status).eql(succes);
		});
	});

	it('10189 | TC2: Validar archivar todas las cards.', function () {
		trelloCards.archiveAllCardsInList({ idList: idList2 }).then(({ status }) => {
			expect(status).eql(succes);
		});
	});

	after(function () {
		trelloCards.archiveList({ idList: idList1 }).then(({ status }) => {
			expect(status).eql(succes);
		});
		trelloCards.archiveList({ idList: idList2 }).then(({ status }) => {
			expect(status).eql(succes);
		});
	});
});
