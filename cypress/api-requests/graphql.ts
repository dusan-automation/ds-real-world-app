const graphqlEndpoint = `${Cypress.env('baseApiUrl')}/graphql`;

export function graphqlBankAccounts() {
  const query = `
        query ListBankAccount {
          listBankAccount {
            id
            uuid
            userId
            bankName
            accountNumber
            routingNumber
            isDeleted
            createdAt
            modifiedAt
          }
        }
    `;

  return cy.request({
    method: 'POST',
    url: graphqlEndpoint,
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      query,
      operationName: 'ListBankAccount',
    },
  });
}
