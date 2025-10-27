import { SELECTORS } from '../support/constants';

describe('тесты конструктора бургеров', () => {
  beforeEach(() => {
    cy.mockIngredients();
    cy.visit('/');
    cy.wait('@mockIngredients');
  });

  it('добавление булки из списка ингредиентов в конструктор', () => {
    cy.get(SELECTORS.INGREDIENT.BUN).contains('Добавить').click();

    cy.get(SELECTORS.BURGER_CONSTRUCTOR).within(() => {
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
    });
  });

  it('добавление начинки из списка ингредиентов в конструктор', () => {
    cy.get(SELECTORS.INGREDIENT.MAIN).contains('Добавить').click();

    cy.get(SELECTORS.BURGER_CONSTRUCTOR)
      .contains('Биокотлета из марсианской говядины')
      .should('exist');
  });

  it('добавление соуса из списка ингредиентов в конструктор', () => {
    cy.get(SELECTORS.INGREDIENT.SAUCE).contains('Добавить').click();

    cy.get(SELECTORS.BURGER_CONSTRUCTOR)
      .contains('Соус фирменный Space Sauce')
      .should('exist');
  });
});
