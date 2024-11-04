import { homePage } from '../pom/home.page';
import { bankAccountsPage } from '../pom/bank-accounts.page';

describe('BANK ACCOUNTS', () => {
  beforeEach('Open "Bank Accounts" page', () => {
    cy.loadUser().then((user) => {
      cy.loginUsingUI(user.username, user.password);
      homePage.openPage();
      homePage.sideNav.username.should('be.visible').and('have.text', `@${user.username}`);
      homePage.sideNav.bankAccountsLink.click();
    });
  });

  context('Negative scenario tests', () => {
    it('Should display erroer message for empty "Bank Name" input', () => {
      bankAccountsPage.createButton.should('be.visible').click();
      bankAccountsPage.bankNameInput.should('be.visible').click();
      bankAccountsPage.routingNumberInput.should('be.visible').click();
      cy.fixture('constants').then((messages) => {
        bankAccountsPage.bankNameInputValidation
          .should('be.visible')
          .and('have.text', messages.bankAccounts.bankNameValidation);
      });
      bankAccountsPage.bankSubmitButton.should('be.disabled');
    });

    it('Should display erroer message for empty "Routing Number" input', () => {
      bankAccountsPage.createButton.should('be.visible').click();
      bankAccountsPage.routingNumberInput.should('be.visible').click();
      bankAccountsPage.accountNumberInput.should('be.visible').click();
      cy.fixture('constants').then((messages) => {
        bankAccountsPage.routingNumberInputValidation
          .should('be.visible')
          .and('have.text', messages.bankAccounts.routingNumberValidation);
      });
      bankAccountsPage.bankSubmitButton.should('be.disabled');
    });

    it('Should display erroer message for empty "Account Number" input', () => {
      bankAccountsPage.createButton.should('be.visible').click();
      bankAccountsPage.accountNumberInput.should('be.visible').click();
      bankAccountsPage.routingNumberInput.should('be.visible').click();
      cy.fixture('constants').then((messages) => {
        bankAccountsPage.accountNumberInputValidation
          .should('be.visible')
          .and('have.text', messages.bankAccounts.accountNumberValidation);
      });
      bankAccountsPage.bankSubmitButton.should('be.disabled');
    });
  });

  context('Positive scenario tests', () => {
    it('Should create new bank account successfully', () => {
      cy.fixture('constants').then((messages) => {
        bankAccountsPage.createBankAccount(
          messages.bankAccounts.bankName,
          messages.bankAccounts.routingNumber,
          messages.bankAccounts.accountNumber
        );
      });
    });

    it('Should delete bank account successfully', () => {
      bankAccountsPage.deleteButton.last().click();
      cy.fixture('constants').then((messages) => {
        cy.contains(messages.bankAccounts.deletedBankName)
          .should('be.visible')
          .and('have.text', messages.bankAccounts.deletedBankName);
      });
    });
  });
});
