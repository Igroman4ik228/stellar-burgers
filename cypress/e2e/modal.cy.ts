import { SELECTORS } from '../support/constants';

describe('тесты модальных окон', () => {
  beforeEach(() => {
    cy.mockIngredients();
    cy.visit('/');
    cy.wait('@mockIngredients');
  });

  describe('модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.get(SELECTORS.INGREDIENT.BUN).click();
    });

    it('открытие модального окна ингредиента', () => {
      cy.get(SELECTORS.MODAL).within(() => {
        cy.contains('Детали ингредиента').should('exist');
        cy.contains('Краторная булка N-200i').should('exist');
      });
    });

    it('закрытие модального окна по клику на крестик', () => {
      cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
      cy.get(SELECTORS.MODAL).should('not.exist');
    });

    it('закрытие модального окна по клику на оверлей', () => {
      cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });
      cy.get(SELECTORS.MODAL).should('not.exist');
    });
  });
});
