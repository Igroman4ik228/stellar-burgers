declare namespace Cypress {
  interface Chainable {
    mockIngredients(): Chainable<void>;
    mockUser(): Chainable<void>;
    mockOrder(): Chainable<void>;
  }
}

Cypress.Commands.add('mockIngredients', () => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
});

Cypress.Commands.add('mockUser', () => {
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  window.localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.setCookie('accessToken', 'test-access-token');
});

Cypress.Commands.add('mockOrder', () => {
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
});
