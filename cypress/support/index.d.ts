declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Command to load a user.
     */
    loadUser(): Chainable<any>;

    /**
     * Custom command to log in using UI with username and password.
     * @example cy.loginUsingUI('username', 'password')
     */
    loginUsingUI(username: string, password: string): Chainable<any>;
  }
}
