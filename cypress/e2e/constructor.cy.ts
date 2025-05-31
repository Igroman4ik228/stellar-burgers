describe('тесты конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('http://localhost:4000');

    cy.wait('@getIngredients');
  });

  it('добавление булки из списка ингредиентов в конструктор', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
    });
  });

  it('добавление начинки из списка ингредиентов в конструктор', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="burger-constructor"]')
      .contains('Биокотлета из марсианской говядины')
      .should('exist');
  });

  it('добавление соуса из списка ингредиентов в конструктор', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093e"]')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="burger-constructor"]')
      .contains('Соус фирменный Space Sauce')
      .should('exist');
  });
});
