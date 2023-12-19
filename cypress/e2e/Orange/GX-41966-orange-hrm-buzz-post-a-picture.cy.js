import { loginPage , buzzPage } from '../../support/pages/Orange/GX-41966-postAPicture';
import data from '../../fixtures/data/Orange/GX-41966-postAPicture.json';
import { removeLogs } from '../../support/helpers/RemoveLogs';

const orange = Cypress.env('orange');
const { baseUrl, AdminUser } = orange;


describe('GX-41966-orange-hrm-buzz-post-a-picture)ge-hrm-buzz-post-a-picture', () => {
	beforeEach(() => {
		cy.session('login', () => {
			cy.visit(baseUrl);
			cy.url().should('contain', 'login');
			loginPage.login({
				username: AdminUser.username,
				password: AdminUser.password,
			});
			cy.url().should('contain', 'dashboard');
		});
		cy.visit(`${baseUrl}/buzz/viewBuzz`);
		cy.url().should('contain', 'viewBuzz');
	});
	it('41967 | TC1: Validar compartir una imagen en la feed.', () => {
		const numberOfImages = 1;
		buzzPage.addImages({
			numberOfPhotos: numberOfImages,
			path: data.path.imagePng,
		});
		//pop up image length
		buzzPage.get.imageContainer().find('img').should('have.length', numberOfImages);
		buzzPage.clickOnShareButton();
		// buzzPage.get.postSucces().should('be.visible').and('have.text', data.messages.succes);
		//feed image length
		buzzPage.get.imageContainer().should('contain.html', 'img');
	});
	it('41967 | TC2: Validar compartir 5 imagenes en la feed.', () => {
		const numberOfImages = 5;
		buzzPage.addImages({
			numberOfPhotos: numberOfImages,
			path: data.path.imagePng,
		});
		buzzPage.get.photosAddInput().should('not.exist');
		//pop up image length
		buzzPage.get.imageContainer().find('img').should('have.length', numberOfImages);
		buzzPage.clickOnShareButton();
		cy.wait(5000);
		buzzPage.get.postSucces().should('be.visible').and('have.text', data.messages.succes);
		//feed image length
		buzzPage.get.imageContainer().find('img').should('have.length', numberOfImages);
	});
	it('41967 | TC3: Validar no compartir imagen de mas de 2mb.', () => {
		const numberOfImages = 1;
		buzzPage.addImages({
			numberOfPhotos: numberOfImages,
			path: data.path.imageGif,
		});
		buzzPage.get.alertContent().should('be.visible').and('have.text', data.messages.maximumAllowedSize)
	});
});

removeLogs();
