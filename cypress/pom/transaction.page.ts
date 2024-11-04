import BasePage from './base.page';

class TransactionPage extends BasePage {
  private searchInputLocator = '[data-test="user-list-search-input"]';
  private userListLocator = '[data-test="users-list"]';
  private transactionAmountLocator = '[data-test="transaction-create-amount-input"]';
  private transactionAmountValidationLocator = '[id="transaction-create-amount-input-helper-text"]';
  private transactionNoteLocator = '[data-test="transaction-create-description-input"]';
  private transactionNoteValidationLocator =
    '[id="transaction-create-description-input-helper-text"]';
  private requestButtonLocator = '[data-test="transaction-create-submit-request"]';
  private payButtonLocator = '[data-test="transaction-create-submit-payment"]';
  private submitedAmountLocator = '[data-test^="transaction-amount-"]';

  constructor() {
    super('/transaction/new');
  }

  get searchInput() {
    return cy.get(this.searchInputLocator);
  }

  get userList() {
    return cy.get(this.userListLocator);
  }

  getUserListItem(index: number = 0) {
    return cy.get(`${this.userListLocator} > li`).eq(index).click({ force: true });
  }

  get transactionAmount() {
    return cy.get(this.transactionAmountLocator);
  }

  get transactionAmountValidation() {
    return cy.get(this.transactionAmountValidationLocator);
  }

  get transactionNote() {
    return cy.get(this.transactionNoteLocator);
  }

  get transactionNoteValidation() {
    return cy.get(this.transactionNoteValidationLocator);
  }

  get requestButton() {
    return cy.get(this.requestButtonLocator);
  }

  get payButton() {
    return cy.get(this.payButtonLocator);
  }

  get submitedAmount() {
    return cy.get(this.submitedAmountLocator).eq(0);
  }

  interceptTransaction() {
    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('baseApiUrl')}/transactions`,
    }).as('transaction');
  }

  /**
   * Verifies the successful transaction of the user by checking the intercepted network response.
   * @param username The expected username of the user.
   */
  checkTransactionSuccess(amount: number, description: string) {
    cy.wait('@transaction').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.transaction.amount).to.eq(amount * 100);
        expect(interception.response.body.transaction.description).to.eq(description);
      } else {
        throw new Error('No response received');
      }
    });
  }
}

export const transactionPage = new TransactionPage();
