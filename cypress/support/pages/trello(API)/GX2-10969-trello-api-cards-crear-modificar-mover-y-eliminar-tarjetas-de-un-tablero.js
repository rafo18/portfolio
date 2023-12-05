import { key, token, idBoard } from '../../../fixtures/data/trello(API)/GX2-10969-CRUD.json';
const trello = Cypress.env('trello');
const { baseUrl } = trello;

class TrelloApi {
	createList({ name }) {
		return cy.api({
			method: 'POST',
			url: `${baseUrl}/boards/${idBoard}/lists`,
			qs: {
				key: key,
				token: token,
				name: name,
			},
		});
	}

	createCard({ idList, cardName }) {
		return cy.api({
			method: 'POST',
			url: `${baseUrl}/cards`,
			qs: {
				idList: idList,
				key: key,
				token: token,
				name: cardName,
			},
		});
	}

	updateCard({ idCard, newCardDescription, newCardName }) {
		return cy.api({
			method: 'PUT',
			url: `${baseUrl}/cards/${idCard}`,
			qs: {
				key: key,
				token: token,
				desc: newCardDescription,
				name: newCardName,
			},
		});
	}
	moveCardToList({ idCard, idListToMove }) {
		return cy.api({
			method: 'PUT',
			url: `${baseUrl}/cards/${idCard}`,
			qs: {
				key: key,
				token: token,
				idList: idListToMove,
			},
		});
	}

	deleteCard({ idCard }) {
		return cy.api({
			method: 'DELETE',
			url: `${baseUrl}/cards/${idCard}`,
			qs: {
				key: key,
				token: token,
			},
		});
	}

	archiveList({ idList }) {
		return cy.api({
			method: 'PUT',
			url: `${baseUrl}/lists/${idList}/closed`,
			qs: {
				key: key,
				token: token,
				value: true,
			},
		});
	}
}

export const trelloCards = new TrelloApi();
