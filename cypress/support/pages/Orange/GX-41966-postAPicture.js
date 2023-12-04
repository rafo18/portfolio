class LoginPage {
	get = {
		username: () => cy.get('[name=username]'),
		password: () => cy.get('[name=password]'),
		loginButton: () => cy.get('[class^=oxd-button]'),
	};

	login({ username, password }) {
		this.get.username().clear().should('be.empty').type(username);
		this.get.password().clear().should('be.empty').type(password);
		this.get.loginButton().click();
	}
}

class BuzzPage {
	get = {
		sharePhotoButton: () => cy.get('[class = oxd-glass-button]').eq(0),
		postPopUp: () => cy.get('[role=document]'),
		photosAddInput: () => cy.get('input[type=file]'),
		popUpShareButton: () => cy.get('button[type=submit]').eq(1),
		postSucces: () => cy.get('[class*="oxd-toast--success"]', { timeout: 15000 }),
		imageContainer: () => cy.get('[class^=orangehrm-buzz-photos]').first(),
		alertContent: () => cy.get('[class^=oxd-alert-content]'),
	};
	addImages({ path, numberOfPhotos }) {
		cy.wait(4000);
		this.get.sharePhotoButton().click();
		this.get
			.postPopUp()
			.should('exist')
			.within(() => {
				for (let i = 0; i < numberOfPhotos; i++) {
					this.get.photosAddInput().selectFile(path, { force: true });
				}
			});
	}
	clickOnShareButton() {
		this.get.popUpShareButton().click();
	}
}

export const buzzPage = new BuzzPage();
export const loginPage = new LoginPage();
