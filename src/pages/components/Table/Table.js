import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses, editExpenses } from '../../../actions';
import TableStyle from './styles';

class Table extends Component {
  render() {
    const { expenses, removeExpense, editExpense } = this.props;
    return (
      <TableStyle>

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
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
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>
                    {Number(expense.value).toFixed(2)}

                  </td>
                  <td>{nameCurrency[0]}</td>
                  <td>
                    {Number(currencyValue).toFixed(2)}
                  </td>
                  <td>{total.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      id="edit"
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => editExpense(expense) }
                    >
                      Editar
                    </button>
                    <button
                      id="remove"
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => removeExpense(expense.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
      </TableStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(removeExpenses(expense)),
  editExpense: (expenseId) => dispatch(editExpenses(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
