export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await result.json();
      const currencies = Object.keys(data)
        .filter((sigla) => sigla !== 'USDT');
      dispatch(getCurrencies(currencies));
    } catch (error) {
      console.log(error);
    }
  };
}

export const saveExpenses = (expense, currencies) => ({
  type: SAVE_EXPENSES,
  expense,
  currencies,
});

export const removeExpenses = (id) => ({
  type: REMOVE_EXPENSES,
  id,
});

export function fetchExpencies(expense) {
  return async (dispatch) => {
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await result.json();
      dispatch(saveExpenses(expense, currencies));
    } catch (error) {
      console.log(error);
    }
  };
}
