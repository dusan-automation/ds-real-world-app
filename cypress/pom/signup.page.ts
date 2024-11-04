import { UserData } from '../support/types';
import BasePage from './base.page';

class SignUpPage extends BasePage {
  private signupFormLocator = '[class="SignUpForm-paper"]';
  private signUpTextLocator = 'Sign Up';
  private firstNameInputLocator = '[data-test="signup-first-name"]';
  private lastNameInputLocator = '[data-test="signup-last-name"]';
  private usernameInputLocator = '[data-test="signup-username"]';
  private passwordInputLocator = '[data-test="signup-password"]';
  private confirmPasswordInputLocator = '[data-test="signup-confirmPassword"]';
  private submitButtonLocator = '[data-test="signup-submit"]';
  private firstNameValidationTextLocator = '[id="firstName-helper-text"]';
  private passwordValdiationTextLocator = '[id="password-helper-text"]';
  private confirmPasswordValdiationTextLocator = '[id="confirmPassword-helper-text"]';

  constructor() {
    super('/signup');
  }

  get signupForm() {
    return cy.get(this.signupFormLocator);
  }

  get signUpText() {
    return this.signupForm.contains(this.signUpTextLocator);
  }

  get firstNameInput() {
    return this.signupForm.find(this.firstNameInputLocator);
  }

  get lastNameInput() {
    return this.signupForm.find(this.lastNameInputLocator);
  }

  get usernameInput() {
    return this.signupForm.find(this.usernameInputLocator);
  }

  get passwordInput() {
    return this.signupForm.find(this.passwordInputLocator);
  }

  get confirmPasswordInput() {
    return this.signupForm.find(this.confirmPasswordInputLocator);
  }

  get submitButton() {
    return this.signupForm.find(this.submitButtonLocator);
  }

  get firstNameValidationText() {
    return this.signupForm.find(this.firstNameValidationTextLocator);
  }

  get passwordValdiationText() {
    return this.signupForm.find(this.passwordValdiationTextLocator);
  }

  get confirmPasswordValdiationText() {
    return this.signupForm.find(this.confirmPasswordValdiationTextLocator);
  }

  openAndVerifyPage() {
    this.openPage();
    cy.fixture('constants').then((messages) => {
      this.signUpText.should('be.visible').and('have.text', messages.signup.signUpText);
    });
    cy.url().should('eq', `${Cypress.config('baseUrl')}/signup`);
  }

  typeFirstName(firstName: string) {
    this.firstNameInput.should('be.visible').type(firstName);
  }

  typeLastName(lastName: string) {
    this.lastNameInput.should('be.visible').type(lastName);
  }

  typeUsername(username: string) {
    this.usernameInput.should('be.visible').type(username);
  }

  typePassword(password: string) {
    this.passwordInput.should('be.visible').type(password);
  }

  typeConfirmPassword(password: string) {
    this.confirmPasswordInput.should('be.visible').type(password);
  }

  submit() {
    this.submitButton.should('be.visible').click();
  }

  submitForcefully() {
    this.submitButton.should('be.visible').click({ force: true });
  }

  /**
   * Fills out the sign-up form based on the provided user data, entering data into all fields present.
   * @param userData An object containing data needed for user registration.
   */
  fillSignUpForm(userData: UserData) {
    if (userData.firstName) {
      this.typeFirstName(userData.firstName);
    }
    if (userData.lastName) {
      this.typeLastName(userData.lastName);
    }
    if (userData.username) {
      this.typeUsername(userData.username);
    }
    if (userData.password) {
      this.typePassword(userData.password);
    }
    if (userData.confirmPassword) {
      this.typeConfirmPassword(userData.confirmPassword);
    }
  }

  performCompleteSignup(userData: UserData) {
    this.fillSignUpForm(userData);
    this.submit();
  }

  submitAndCheckUserNotCreated() {
    this.submitForcefully();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/signup`);
    this.submitButton.should('be.disabled');
  }

  checkFirstNameValidation() {
    cy.fixture('constants').then((messages) => {
      this.firstNameValidationText
        .should('be.visible')
        .and('have.text', messages.signup.firstNameRequired);
    });
  }

  checkPasswordLengthValidation() {
    cy.fixture('constants').then((messages) => {
      this.passwordValdiationText
        .should('be.visible')
        .and('have.text', messages.signup.passwordMinLength);
    });
  }

  checkPasswordMatchValidation() {
    cy.fixture('constants').then((messages) => {
      this.confirmPasswordValdiationText
        .should('be.visible')
        .and('have.text', messages.signup.passwordMismatch);
    });
  }

  /**
   * Sets up an intercept for a user creation request to capture the resulting network call.
   */
  interceptCreateUser() {
    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('baseApiUrl')}/users`,
    }).as('createUser');
  }

  /**
   * Verifies the successful creation of the user by checking the intercepted network response.
   * @param firstName The expected first name of the user.
   * @param lastName The expected last name of the user.
   * @param username The expected username of the user.
   */
  checkUserCreationSuccess(firstName: string, lastName: string, username: string) {
    cy.wait('@createUser').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(201);
        expect(interception.response.body.user.firstName).to.eq(firstName);
        expect(interception.response.body.user.lastName).to.eq(lastName);
        expect(interception.response.body.user.username).to.eq(username);
      } else {
        throw new Error('No response received');
      }
    });
    cy.url().should('eq', `${Cypress.config('baseUrl')}/signin`);
  }
}

export const signUpPage = new SignUpPage();
