import rootReducer from './rootReducer';

const expectedInitialState = {
  user: {
    data: null,
    isAuthChecked: false,
    registerIsLoading: false,
    registerError: null,
    loginIsLoading: false,
    loginError: null,
    getIsLoading: false,
    getError: null,
    updateIsLoading: false,
    updateError: null
  },
  ingredient: {
    data: [],
    isLoading: false,
    error: null
  },
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  },
  orders: {
    data: [],
    isLoading: false,
    error: null
  },
  order: {
    newOrderData: null,
    newOrderIsLoading: false,
    newOrderError: null,
    orderByNumber: null,
    orderByNumberIsLoading: false,
    orderByNumberError: null
  }
};

describe('тест rootReducer', () => {
  it('начальное состояние при вызове с неопределенным состоянием и неизвестным действием', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const actualState = rootReducer(undefined, unknownAction);

    expect(actualState).toEqual(expectedInitialState);
  });
});
