import { faker } from '@faker-js/faker';
import { homePage } from '../pom/home.page';
import { transactionPage } from '../pom/transaction.page';

describe('TRANSACTIONS', () => {
  beforeEach('Open new transactions page', () => {
    cy.loadUser().then((user) => {
      cy.loginUsingUI(user.username, user.password);
      homePage.openPage();
      homePage.topNav.newTransactionButton.click();
      transactionPage.getUserListItem();
    });
  });

  context('Negative scenario tests', () => {
    it('Should reject letters for "Amount" input', () => {
      transactionPage.transactionAmount.should('be.visible').type(faker.book.author());
      cy.fixture('constants').then((messages) => {
        transactionPage.transactionAmount.should('be.visible').and('have.value', '');
      });
      transactionPage.requestButton.should('be.disabled');
      transactionPage.payButton.should('be.disabled');
    });

    it('Should display error message for empty "Amount" input', () => {
      transactionPage.transactionAmount.should('be.visible').click();
      transactionPage.transactionNote.should('be.visible').click();
      cy.fixture('constants').then((messages) => {
        transactionPage.transactionAmountValidation
          .should('be.visible')
          .and('have.text', messages.transactions.amountInputValidation);
      });
      transactionPage.requestButton.should('be.disabled');
      transactionPage.payButton.should('be.disabled');
    });

    it('Should display error message for empty "Note" input', () => {
      transactionPage.transactionNote.should('be.visible').click();
      transactionPage.transactionAmount.should('be.visible').click();
      cy.fixture('constants').then((messages) => {
        transactionPage.transactionNoteValidation
          .should('be.visible')
          .and('have.text', messages.transactions.noteInputValdiation);
      });
      transactionPage.requestButton.should('be.disabled');
      transactionPage.payButton.should('be.disabled');
    });
  });

  context('Positive scenario tests', () => {
    const amount = faker.number.int({ max: 1000000 });
    const note = faker.lorem.slug();

    beforeEach('Should submit new transaction successfully', () => {
      transactionPage.interceptTransaction();
      transactionPage.transactionAmount.should('be.visible').type(amount.toString());
      transactionPage.transactionNote.should('be.visible').type(note);
      transactionPage.payButton.click();
    });

    it('Should submit new transaction successfully', () => {
      transactionPage.checkTransactionSuccess(amount, note);
    });

    it('Should check transaction on personal page', () => {
      homePage.sideNav.homeLink.click();
      homePage.topNav.mineTab.click();
      let formattedCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(-parseInt(amount.toString()));
      transactionPage.submitedAmount.should('be.visible').and('have.text', formattedCurrency);
    });
  });
});
