import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './components/Form';
import Header from './components/Header';
import { fetchExpencies, removeExpenses, editExpenses } from '../actions';

class Wallet extends React.Component {
  render() {
    const { expenses, removeExpense, editExpense } = this.props;
    return (
      <div className="bg-sky-900 h-screen">
        <Header />
        <Form />
        <table
          className="border-collapse border-solid border
        border-white table-auto w-screen"
        >
          <thead className="text-white table-header-group">
            <tr className="table-row">
              <th className="border ml-[30px] table-cell text-center">Descrição</th>
              <th className="border table-cell text-center">Tag</th>
              <th className="border table-cell text-center">Método de pagamento</th>
              <th className="border table-cell text-center">Valor</th>
              <th className="border table-cell text-center">Moeda</th>
              <th className="border table-cell text-center">Câmbio utilizado</th>
              <th className="border table-cell text-center">Valor convertido</th>
              <th className="border table-cell text-center">Moeda de conversão</th>
              <th className="border mr-[30px] table-cell text-center">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {expenses.map((expense, index) => {
              const currentCurrency = Object.entries(expense.exchangeRates)
                .find((currency) => currency[0] === expense.currency);
              const nameCurrency = currentCurrency[1].name.split('/');
              const currencyValue = currentCurrency[1].ask;
              const total = expense.value * currencyValue;
              return (
                <tr
                  key={ expense.id }
                  id={ index }
                  className={ index % 2 === 0 ? 'text-black bg-sky-300'
                    : 'bg-sky-800 text-white' }
                >
                  <td className="border table-cell text-center">{expense.description}</td>
                  <td className="border table-cell text-center">{expense.tag}</td>
                  <td className="border table-cell text-center">{expense.method}</td>
                  <td
                    className="border table-cell text-center"
                  >
                    {Number(expense.value).toFixed(2)}

                  </td>
                  <td className="border table-cell text-center">{nameCurrency[0]}</td>
                  <td
                    className="border table-cell text-center"
                  >
                    {Number(currencyValue).toFixed(2)}

                  </td>
                  <td className="border table-cell text-center">{total.toFixed(2)}</td>
                  <td className="border table-cell text-center">Real</td>
                  <td className="border table-cell text-center">
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => editExpense(expense.id) }
                      className="px-[12px] py-[16] bg-amber-200 rounded
                       w-[100px] h-[30px] shadow-lg shadow-gray-600
                        disabled:opacity-75 disabled:text-slate-400 text-black mr-[10px]
                        hover:bg-amber-300 hover:text-black hover:shadow-white"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => removeExpense(expense.id) }
                      className="px-[12px] py-[16] bg-red-500 rounded
            w-[100px] h-[30px] shadow-lg shadow-gray-600 ml-[10px]
            disabled:opacity-75 disabled:text-slate-400 text-white
            hover:bg-red-600 hover:text-white hover:shadow-white"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({

  addExpenses: (expenses) => dispatch(fetchExpencies(expenses)),
  removeExpense: (expense) => dispatch(removeExpenses(expense)),
  editExpense: (expenseId) => dispatch(editExpenses(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
