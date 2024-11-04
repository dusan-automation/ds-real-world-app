import { bankAccountsPage } from './bank-accounts.page';
import BasePage from './base.page';

class HomePage extends BasePage {
  private onboardingNextButtonLocator = '[data-test="user-onboarding-next"]';

  constructor() {
    super('/');
  }

  get onboardingNextButton() {
    return cy.get(this.onboardingNextButtonLocator);
  }

  completUserOnboarding() {
    this.onboardingNextButton.should('be.visible').click();
    cy.fixture('constants').then((messages) => {
      bankAccountsPage.bankNameInput.should('be.visible').type(messages.bankAccounts.bankName);
      bankAccountsPage.routingNumberInput
        .should('be.visible')
        .type(messages.bankAccounts.routingNumber);
      bankAccountsPage.accountNumberInput
        .should('be.visible')
        .type(messages.bankAccounts.accountNumber);
    });
    bankAccountsPage.bankSubmitButton.should('be.visible').click();
    this.onboardingNextButton.should('be.visible').click();
  }
}

export const homePage = new HomePage();
