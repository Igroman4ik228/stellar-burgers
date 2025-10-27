import { SELECTORS } from '../support/constants';

describe('тесты создания заказа', () => {
  describe('авторизованный пользователь', () => {
    beforeEach(() => {
      cy.mockIngredients();
      cy.mockOrder();
      cy.mockUser();
      cy.visit('/');
      cy.wait(['@mockIngredients', '@mockUser']);
    });

    it('создание заказа с булкой и начинкой', () => {
      cy.get(SELECTORS.INGREDIENT.BUN).contains('Добавить').click();

      cy.get(SELECTORS.INGREDIENT.MAIN).contains('Добавить').click();

      cy.get(SELECTORS.BURGER_CONSTRUCTOR).within(() => {
        cy.contains('Краторная булка N-200i').should('exist');
        cy.contains('Биокотлета из марсианской говядины').should('exist');
      });

      cy.get(SELECTORS.ORDER_BUTTON).click();

      cy.wait('@mockOrder');

      cy.get(SELECTORS.MODAL).contains('12345').should('exist');

      cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
      cy.get(SELECTORS.MODAL).should('not.exist');

      cy.get(SELECTORS.BURGER_CONSTRUCTOR).within(() => {
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
      });
    });
  });
  describe('неавторизованный пользователь', () => {
    beforeEach(() => {
      cy.mockIngredients();
      cy.mockOrder();
      cy.visit('/');
      cy.wait('@mockIngredients');
    });

    it('перенаправление на страницу логина при попытке создать заказ', () => {
      cy.get(SELECTORS.INGREDIENT.BUN).contains('Добавить').click();

      cy.get(SELECTORS.ORDER_BUTTON).click();

      cy.url().should('include', '/login');
    });
  });
});
