// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { signInPage } from '../pom/signin.page';

Cypress.Commands.add('loadUser', () => {
  cy.fixture('user').then((user) => {
    return user;
  });
});

Cypress.Commands.add('loginUsingUI', (username: string, password: string) => {
  cy.session(
    [username, password],
    () => {
      signInPage.openAndVerifyPage();
      signInPage.typeUsername(username);
      signInPage.typePassword(password);
      signInPage.submit();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});
