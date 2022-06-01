import { GET_CURRENCIES, SAVE_EXPENSES,
  REMOVE_EXPENSES, EDIT_EXPENSES, EDIT_EXPENSES_FORM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  buttonEdit: false,
  editExpense: {},
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

  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };

  case EDIT_EXPENSES:
    return {
      ...state,
      buttonEdit: true,
      editExpense: action.expense,
    };

  case EDIT_EXPENSES_FORM:
    return {
      ...state,
      buttonEdit: false,
      expenses: [...action.expenses],
      editExpense: {},
    };
  default:
    return state;
  }
};

export default wallet;
