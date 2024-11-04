import { faker } from '@faker-js/faker';
import { homePage } from '../pom/home.page';
import { myAccountPage } from '../pom/my-account.page';

describe('MY ACCOUNT', () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const userEmail = faker.internet.email();
  const userPhone = faker.number.int().toString();

  beforeEach('Open "My Account" page', () => {
    cy.loadUser().then((user) => {
      cy.loginUsingUI(user.username, user.password);
      homePage.openPage();
      homePage.sideNav.username.should('be.visible').and('have.text', `@${user.username}`);
      homePage.sideNav.myAccountLink.click();
    });
  });

  context('Negative scenario tests', () => {
    it('Should display erroer message for empty "First Name" input', () => {
      myAccountPage.firstNameInput.should('be.visible').clear().blur();
      cy.fixture('constants').then((messages) => {
        myAccountPage.firstNameInputValidation
          .should('be.visible')
          .and('have.text', messages.myAccount.firstNameValidation);
      });
      myAccountPage.submitButton.should('be.disabled');
    });

    it('Should display erroer message for empty "Last Name" input', () => {
      myAccountPage.lastNameInput.should('be.visible').clear().blur();
      cy.fixture('constants').then((messages) => {
        myAccountPage.lastNameInputValidation
          .should('be.visible')
          .and('have.text', messages.myAccount.lastNameValidation);
      });
      myAccountPage.submitButton.should('be.disabled');
    });

    it('Should display erroer message for empty "Email" input', () => {
      myAccountPage.emailInput.should('be.visible').clear().blur();
      cy.fixture('constants').then((messages) => {
        myAccountPage.emailInputValidation
          .should('be.visible')
          .and('have.text', messages.myAccount.emailValidation);
      });
      myAccountPage.submitButton.should('be.disabled');
    });

    it('Should display erroer message for empty "Phone" input', () => {
      myAccountPage.phoneInput.should('be.visible').clear().blur();
      cy.fixture('constants').then((messages) => {
        myAccountPage.phoneInputValidation
          .should('be.visible')
          .and('have.text', messages.myAccount.phoneNumberValidation);
      });
      myAccountPage.submitButton.should('be.disabled');
    });

    it('Should display erroer message for invalid "Email" input', () => {
      myAccountPage.emailInput.should('be.visible').clear().type(faker.color.rgb());
      cy.fixture('constants').then((messages) => {
        myAccountPage.emailInputValidation
          .should('be.visible')
          .and('have.text', messages.myAccount.emailFormatValdiation);
      });
      myAccountPage.submitButton.should('be.disabled');
    });

    it('Should display erroer message for invalid "Phone" input', () => {
      myAccountPage.phoneInput.should('be.visible').clear().type(faker.color.rgb());
      cy.fixture('constants').then((messages) => {
        myAccountPage.phoneInputValidation
          .should('be.visible')
          .and('have.text', messages.myAccount.phoneNumberFormatValdiation);
      });
      myAccountPage.submitButton.should('be.disabled');
    });
  });

  context('Positive scenario tests', () => {
    it('Should update all user info', () => {
      myAccountPage.updateUserInfo({
        firstName: firstName,
        lastName: lastName,
        email: userEmail,
        phone: userPhone,
      });
      cy.reload();
      myAccountPage.firstNameInput.should('be.visible').and('have.value', firstName);
      myAccountPage.lastNameInput.should('be.visible').and('have.value', lastName);
      myAccountPage.emailInput.should('be.visible').and('have.value', userEmail);
      myAccountPage.phoneInput.should('be.visible').and('have.value', userPhone);
    });
  });
});
