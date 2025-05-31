describe('тесты создания заказа', () => {
  beforeEach(() => {
    cy.mockIngredients();
    cy.mockUser();
    cy.mockOrder();
    cy.visit('/');
  });

  it('создание заказа', () => {
    // Добавление булки
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .contains('Добавить')
      .click();

    // Добавление начинки
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .contains('Добавить')
      .click();

    // Оформление заказа
    cy.get('[data-cy="burger-constructor"]').contains('Оформить заказ').click();

    // Проверка модального окна с номером заказа
    cy.get('[data-cy="modal"]').contains('12345').should('exist');

    // Закрытие модального окна
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверка очистки конструктора
    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
