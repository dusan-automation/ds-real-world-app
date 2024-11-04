import { faker } from '@faker-js/faker';
import { homePage } from '../pom/home.page';
import { signInPage } from '../pom/signin.page';
import { signUpPage } from '../pom/signup.page';
import { UserData } from '../support/types';

describe('SIGN UP', () => {
  const newUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.username(),
    password: faker.internet.password(),
  };

  const user = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    username: newUser.username,
    password: newUser.password,
  };

  beforeEach('Open signup page', () => {
    cy.writeFile('cypress/fixtures/user.json', user);
    signUpPage.openAndVerifyPage();
  });

  after('Should complete onbording for new user', function () {
    signInPage.interceptLoginUser();
    signInPage.performCompleteSignin({
      username: user.username,
      password: user.password,
    });
    signInPage.checkUserLoginSuccess(user.username);
    homePage.completUserOnboarding();
  });

  context('Negative scenario tests', () => {
    it('Should not create new user when all fields are empty', () => {
      signUpPage.submitAndCheckUserNotCreated();
      signUpPage.checkFirstNameValidation();
    });

    const newUserArray = Object.keys(newUser).map((key) => {
      return { [key]: newUser[key as keyof typeof newUser] };
    });

    newUserArray.forEach((item) => {
      const fieldName = Object.keys(item)[0];
      it(`Should not create new user when only "${fieldName}" is populated`, () => {
        signUpPage.fillSignUpForm({
          [fieldName]: item[fieldName],
        } as UserData);
        signUpPage.submitAndCheckUserNotCreated();
      });
    });

    it('Should not create new user when only "First Name" field is empty', () => {
      signUpPage.fillSignUpForm({
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        password: newUser.password,
        confirmPassword: newUser.password,
      });
      signUpPage.submitAndCheckUserNotCreated();
      signUpPage.checkFirstNameValidation();
    });

    it('Should not create new user when only "Last Name" field is empty', () => {
      signUpPage.fillSignUpForm({
        firstName: faker.person.firstName(),
        username: faker.internet.username(),
        password: newUser.password,
        confirmPassword: newUser.password,
      });
      signUpPage.submitAndCheckUserNotCreated();
    });

    it('Should not create new user when only "Username" field is empty', () => {
      signUpPage.fillSignUpForm({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: newUser.password,
        confirmPassword: newUser.password,
      });
      signUpPage.submitAndCheckUserNotCreated();
    });

    it('Should not create new user when only "Password" field is empty', () => {
      signUpPage.fillSignUpForm({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        confirmPassword: faker.internet.password(),
      });
      signUpPage.submitAndCheckUserNotCreated();
    });

    it('Should not create new user when only "Confirm Password" field is empty', () => {
      signUpPage.fillSignUpForm({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        password: faker.internet.password(),
      });
      signUpPage.submitAndCheckUserNotCreated();
    });

    it('Should show an error when "Password" contains less than 4 characters', () => {
      signUpPage.fillSignUpForm({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        password: '123',
        confirmPassword: '123',
      });
      signUpPage.submitAndCheckUserNotCreated();
      signUpPage.checkPasswordLengthValidation();
    });

    it('Should show an error when "Password" does not match', () => {
      signUpPage.fillSignUpForm({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password(),
      });
      signUpPage.submitAndCheckUserNotCreated();
      signUpPage.checkPasswordMatchValidation();
    });
  });

  context('Positive scenario tests', () => {
    it('Should create new user successfully', () => {
      signUpPage.interceptCreateUser();
      signUpPage.performCompleteSignup({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        password: newUser.password,
        confirmPassword: newUser.password,
      });
      signUpPage.checkUserCreationSuccess(newUser.firstName, newUser.lastName, newUser.username);
    });
  });
});
