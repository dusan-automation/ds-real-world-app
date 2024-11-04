import BasePage from './base.page';

class MyAccountPage extends BasePage {
  private firstNameInputLocator = '[data-test="user-settings-firstName-input"]';
  private firstNameInputValidationLocator = '[id="user-settings-firstName-input-helper-text"]';
  private lastNameInputLocator = '[data-test="user-settings-lastName-input"]';
  private lastNameInputValidationLocator = '[id="user-settings-lastName-input-helper-text"]';
  private emailInputLocator = '[data-test="user-settings-email-input"]';
  private emailInputValidationLocator = '[id="user-settings-email-input-helper-text"]';
  private phoneInputLocator = '[data-test="user-settings-phoneNumber-input"]';
  private phoneInputValidationLocator = '[id="user-settings-phoneNumber-input-helper-text"]';
  private submitButtonLocator = '[data-test="user-settings-submit"]';

  constructor() {
    super('/settings');
  }

  get firstNameInput() {
    return cy.get(this.firstNameInputLocator);
  }

  get firstNameInputValidation() {
    return cy.get(this.firstNameInputValidationLocator);
  }

  get lastNameInput() {
    return cy.get(this.lastNameInputLocator);
  }

  get lastNameInputValidation() {
    return cy.get(this.lastNameInputValidationLocator);
  }

  get emailInput() {
    return cy.get(this.emailInputLocator);
  }

  get emailInputValidation() {
    return cy.get(this.emailInputValidationLocator);
  }

  get phoneInput() {
    return cy.get(this.phoneInputLocator);
  }

  get phoneInputValidation() {
    return cy.get(this.phoneInputValidationLocator);
  }

  get submitButton() {
    return cy.get(this.submitButtonLocator);
  }

  /**
   * Updates user information based on provided fields.
   * @param {object} userInfo - Contains user details.
   */
  updateUserInfo(userInfo: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  }) {
    if (userInfo.email !== undefined) {
      this.emailInput.should('be.visible').clear().type(userInfo.email);
    }
    if (userInfo.phone !== undefined) {
      this.phoneInput.should('be.visible').clear().type(userInfo.phone);
    }
    if (userInfo.firstName !== undefined) {
      this.firstNameInput.should('be.visible').clear().type(userInfo.firstName);
    }
    if (userInfo.lastName !== undefined) {
      this.lastNameInput.should('be.visible').clear().type(userInfo.lastName);
    }
    this.submitButton.should('be.visible').click();
  }
}

export const myAccountPage = new MyAccountPage();
