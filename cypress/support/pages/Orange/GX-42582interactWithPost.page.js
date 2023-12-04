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
		postPopUp: () => cy.get('[role=document]'),
		popUpShareButton: () => cy.get('button[type=submit]').eq(1),
		postSucces: () => cy.get('div[class^=oxd-toast-content]', { timeout: 15000 }),
		postContainer: () => cy.get('[class ^= oxd-sheet]').eq(1),
		postFooter: () => cy.get('[class=orangehrm-buzz-post-footer]').first(),
		shareButton: () => cy.get('[class$=bi-share-fill]').first(),
		likeButton: () => cy.get('[class="orangehrm-buzz-post-actions"] div'),
		commentButton: () => cy.get('[class$="bi-chat-text-fill"]'),
		textLikes: () => cy.get('[class^=oxd-text]').first(),
		commentShareInput: () => cy.get('[class = oxd-buzz-post-input]').eq(1),
		commentAPostInput: () => cy.get('[class=oxd-form] input'),
		commentsContainer: () => cy.get('[class=orangehrm-buzz-comment]'),
		comments: () => cy.get('[class=orangehrm-buzz-comment] [class$=orangehrm-post-comment-text]').last(),
		showMoreButton: () => cy.get('[class$=orangehrm-buzz-comment-readmore]'),
	};

	shareAPost({ comment }) {
		cy.wait(4000);
		this.get.shareButton().click({ force: true });
		this.get.postPopUp().should('exist');
		this.get.commentShareInput().clear().should('be.empty').type(comment);
		this.get.popUpShareButton().click();
	}

	likeAPost() {
		let likeText;
		return cy
			.get('*')
			.then(() => {
				this.get.postFooter().within(() => {
					this.get.textLikes().then($text => {
						likeText = parseInt($text.text().slice(0, 1));
					});
					this.get.likeButton().click({ force: true });
				});
			})
			.then(() => {
				return likeText;
			});
	}

	comentAPost({ comment }) {
		this.get.postContainer().within(() => {
			this.get.commentButton().click({ force: true });
			this.get.commentAPostInput().clear().should('be.empty').type(`${comment}{enter}`);
			cy.wait(3000);
		});
	}
}

export const buzzPage = new BuzzPage();
export const loginPage = new LoginPage();
