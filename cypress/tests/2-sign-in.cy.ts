import { faker } from '@faker-js/faker';
import { homePage } from '../pom/home.page';
import { signInPage } from '../pom/signin.page';
import { User } from '../support/types';

describe('SIGN IN', () => {
  let user: User;

  beforeEach('Open signin page', function () {
    cy.loadUser().then((loadUser) => {
      user = loadUser;
    });
    signInPage.openAndVerifyPage();
  });

  context('Negative scenario tests', () => {
    it('Should not sign in user when "Username" and "Password" are empty', () => {
      signInPage.submitAndCheckUserNotSignedIn();
    });

    it('Should not sign in user with wrong "Username" and "Password"', () => {
      signInPage.interceptLoginUser();
      signInPage.fillSignInForm({
        username: faker.internet.username(),
        password: faker.internet.password(),
      });
      signInPage.submitAndCheckUserNotSignedIn();
      signInPage.checkUserLoginFailed();
      signInPage.checkSignInErrorText();
    });

    it('Should not sign in user with valid "Username" and invalid "Password"', () => {
      signInPage.interceptLoginUser();
      signInPage.fillSignInForm({
        username: user.username,
        password: faker.internet.password(),
      });
      signInPage.submitAndCheckUserNotSignedIn();
      signInPage.checkUserLoginFailed();
      signInPage.checkSignInErrorText();
    });

    it('Should not sign in user with invaild "Username" and valid "Password"', () => {
      signInPage.interceptLoginUser();
      signInPage.fillSignInForm({
        username: faker.internet.username(),
        password: user.password,
      });
      signInPage.submitAndCheckUserNotSignedIn();
      signInPage.checkUserLoginFailed();
      signInPage.checkSignInErrorText();
    });

    it('Should not sign in user when "Password" field is empty', () => {
      signInPage.fillSignInForm({
        username: faker.internet.username(),
      });
      signInPage.submitAndCheckUserNotSignedIn();
    });

    it('Should not sign in user when "Username" field is empty', () => {
      signInPage.fillSignInForm({
        password: faker.internet.password(),
      });
      signInPage.submitAndCheckUserNotSignedIn();
    });
  });

  context('Positive scenario tests', () => {
    it('Should sign in user successfully', function () {
      signInPage.interceptLoginUser();
      signInPage.performCompleteSignin({
        username: user.username,
        password: user.password,
      });
      signInPage.checkUserLoginSuccess(user.username);
      homePage.sideNav.username.should('be.visible').and('have.text', `@${user.username}`);
    });
  });
});
