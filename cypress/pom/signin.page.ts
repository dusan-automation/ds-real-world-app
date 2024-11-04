import { UserData } from '../support/types';
import BasePage from './base.page';

class SignInPage extends BasePage {
  private signinFormLocator = '[class="SignInForm-paper"]';
  private signInTextLocator = 'Sign In';
  private usernameInputLocator = '[data-test="signin-username"]';
  private passwordInputLocator = '[data-test="signin-password"]';
  private submitButtonLocator = '[data-test="signin-submit"]';
  private signinErrorMessageLocator = '[data-test="signin-error"]';

  constructor() {
    super('/signin');
  }

  get signInText() {
    return this.signinForm.contains(this.signInTextLocator);
  }

  get signinForm() {
    return cy.get(this.signinFormLocator);
  }

  get usernameInput() {
    return this.signinForm.find(this.usernameInputLocator);
  }

  get passwordInput() {
    return this.signinForm.find(this.passwordInputLocator);
  }

  get submitButton() {
    return this.signinForm.find(this.submitButtonLocator);
  }

  get signinErrorMessage() {
    return this.signinForm.find(this.signinErrorMessageLocator);
  }

  openAndVerifyPage() {
    this.openPage();
    cy.fixture('constants').then((messages) => {
      this.signInText.should('be.visible').and('have.text', messages.signin.signInText);
    });
    cy.url().should('eq', `${Cypress.config('baseUrl')}/signin`);
  }

  typeUsername(username: string) {
    this.usernameInput.should('be.visible').type(username);
  }

  typePassword(password: string) {
    this.passwordInput.should('be.visible').type(password);
  }

  submit() {
    this.submitButton.should('be.visible').click();
  }

  /**
   * Fills out the sign-in form based on the provided user data, entering data into all fields present.
   * @param userData An object containing data needed for user registration.
   */
  fillSignInForm(userData: UserData) {
    if (userData.username) {
      this.typeUsername(userData.username);
    }
    if (userData.password) {
      this.typePassword(userData.password);
    }
  }

  performCompleteSignin(userData: UserData) {
    this.fillSignInForm(userData);
    this.submit();
  }

  submitAndCheckUserNotSignedIn() {
    this.submitButton.click({ force: true });
    cy.url().should('eq', `${Cypress.config('baseUrl')}/signin`);
  }

  checkSignInErrorText() {
    cy.fixture('constants').then((messages) => {
      this.signinErrorMessage
        .should('be.visible')
        .and('have.text', messages.signin.invalidUsernameOrPassword);
    });
  }

  checkUsernameValidation() {
    cy.fixture('constants').then((messages) => {
      this.usernameInput.should('be.visible').and('have.text', messages.signin.usernameValidation);
    });
  }

  interceptLoginUser() {
    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('baseApiUrl')}/login`,
    }).as('loginUser');
  }

  /**
   * Verifies the failed sign in of the user by checking the intercepted network response.
   * @param username The expected username of the user.
   */
  checkUserLoginFailed() {
    cy.wait('@loginUser').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(401);
      } else {
        throw new Error('No response received');
      }
    });
  }

  /**
   * Verifies the successful sign in of the user by checking the intercepted network response.
   * @param username The expected username of the user.
   */
  checkUserLoginSuccess(username: string) {
    cy.wait('@loginUser').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.user.username).to.eq(username);
      } else {
        throw new Error('No response received');
      }
    });
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  }
}

export const signInPage = new SignInPage();
