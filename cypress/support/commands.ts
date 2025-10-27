declare namespace Cypress {
  interface Chainable {
    mockIngredients(): Chainable;
    mockUser(): Chainable;
    mockOrder(): Chainable;
  }
}

Cypress.Commands.add('mockIngredients', () => {
  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients.json',
    statusCode: 200
  }).as('mockIngredients');
});

Cypress.Commands.add('mockUser', () => {
  cy.intercept('GET', 'api/auth/user', {
    fixture: 'user.json',
    statusCode: 200
  }).as('mockUser');

  window.localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.setCookie('accessToken', 'test-access-token');
});

Cypress.Commands.add('mockOrder', () => {
  cy.intercept('POST', 'api/orders', {
    fixture: 'order.json',
    statusCode: 200
  }).as('mockOrder');
});
