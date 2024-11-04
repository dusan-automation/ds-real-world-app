import BasePage from './base.page';

class BankAccountsPage extends BasePage {
  private createButtonLocator = '[data-test="bankaccount-new"]';
  private deleteButtonLocator = '[data-test="bankaccount-delete"]';
  private bankNameInputLocator = '[data-test="bankaccount-bankName-input"]';
  private bankNameInputValidationLocator = '[id="bankaccount-bankName-input-helper-text"]';
  private routingNumberInputLocator = '[data-test="bankaccount-routingNumber-input"]';
  private routingNumberInputValidationLocator =
    '[id="bankaccount-routingNumber-input-helper-text"]';
  private accountNumberInputLocator = '[data-test="bankaccount-accountNumber-input"]';
  private accountNumberInputValidationLocator =
    '[id="bankaccount-accountNumber-input-helper-text"]';
  private bankSubmitButtonLocator = '[data-test="bankaccount-submit"]';

  constructor() {
    super('/bankaccounts');
  }

  get createButton() {
    return cy.get(this.createButtonLocator);
  }

  get deleteButton() {
    return cy.get(this.deleteButtonLocator);
  }

  get bankNameInput() {
    return cy.get(this.bankNameInputLocator);
  }

  get bankNameInputValidation() {
    return cy.get(this.bankNameInputValidationLocator);
  }

  get routingNumberInput() {
    return cy.get(this.routingNumberInputLocator);
  }

  get routingNumberInputValidation() {
    return cy.get(this.routingNumberInputValidationLocator);
  }

  get accountNumberInput() {
    return cy.get(this.accountNumberInputLocator);
  }

  get accountNumberInputValidation() {
    return cy.get(this.accountNumberInputValidationLocator);
  }

  get bankSubmitButton() {
    return cy.get(this.bankSubmitButtonLocator);
  }

  createBankAccount(bankName: string, routingNumber: string, AccountNumber: string) {
    this.createButton.should('be.visible').click();
    this.bankNameInput.should('be.visible').type(bankName);
    this.routingNumberInput.should('be.visible').type(routingNumber);
    this.accountNumberInput.should('be.visible').type(AccountNumber);
    this.bankSubmitButton.should('be.visible').click();
    cy.contains(bankName).should('be.visible');
  }
}

export const bankAccountsPage = new BankAccountsPage();
