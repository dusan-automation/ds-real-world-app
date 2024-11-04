import { homePage } from '../pom/home.page';
import { graphqlBankAccounts } from '../api-requests/graphql';

describe('GraphQL API tests for Bank Accounts', () => {
  beforeEach(() => {
    cy.loadUser().then((user) => {
      cy.loginUsingUI(user.username, user.password);
      homePage.openPage();
    });
  });

  context('Response Structure and Connectivity', () => {
    it('should successfully connect to the API and retrieve data', () => {
      graphqlBankAccounts().then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.property('listBankAccount');
        expect(response.body.data.listBankAccount).to.be.an('array');
      });
    });
  });

  context('Data Integrity', () => {
    it('should have all required fields in each bank account', () => {
      graphqlBankAccounts().then((response) => {
        const accounts = response.body.data.listBankAccount;
        accounts.forEach((item: any) => {
          expect(item).to.include.all.keys(
            'id',
            'uuid',
            'userId',
            'bankName',
            'accountNumber',
            'routingNumber',
            'isDeleted',
            'createdAt',
            'modifiedAt'
          );
        });
      });
    });
  });

  context('Exact Data Validation', () => {
    it('should match the expected details for each bank account', () => {
      graphqlBankAccounts().then((response) => {
        const accounts = response.body.data.listBankAccount;
        cy.fixture('constants').then((messages) => {
          accounts.forEach((item: any) => {
            expect(item.bankName).to.eq(messages.bankAccounts.bankName);
            expect(item.routingNumber).to.eq(messages.bankAccounts.routingNumber);
            expect(item.accountNumber).to.eq(messages.bankAccounts.accountNumber);
          });
        });
      });
    });
  });
});
