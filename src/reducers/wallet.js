import { GET_CURRENCIES, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expense,
        exchangeRates: action.currencies,
      }],
    };
  default:
    return state;
  }
};

export default wallet;
