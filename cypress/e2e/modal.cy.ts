describe('тесты модальных окон', () => {
  beforeEach(() => {
    cy.mockIngredients();
    cy.visit('/');
  });

  describe('модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]').click();
    });

    it('открытие модального окна ингредиента', () => {
      cy.get('[data-cy="modal"]').within(() => {
        cy.contains('Детали ингредиента').should('exist');
        cy.contains('Краторная булка N-200i').should('exist');
      });
    });

    it('закрытие модального окна по клику на крестик', () => {
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('закрытие модального окна по клику на оверлей', () => {
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
});
