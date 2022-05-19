import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, fetchExpencies, editExpenciesForm } from '../../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      expense: {},
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange = ({ target }) => {
    const { name } = target;

    this.setState({
      [name]: target.value,
    }, () => {
      const { id, value, description, currency, method, tag } = this.state;
      this.setState({
        expense: {
          id,
          value,
          description,
          currency,
          method,
          tag,
        },
      });
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { addExpenses } = this.props;
    const { expense, id } = this.state;
    addExpenses(expense);
    this.setState({
      id: (id + 1),
      value: 0,
      description: '',
    });
  }

  onEdit = (event) => {
    event.preventDefault();
    const { editExpense, expenseId, expenses } = this.props;
    const { expense } = this.state;
    const editedExpense = {
      id: expenseId,
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
    };

    const editedList = expenses.map((expenseList) => {
      if (expenseList.id === editedExpense.id) {
        return {
          id: editedExpense.id,
          value: editedExpense.value,
          description: editedExpense.description,
          currency: editedExpense.currency,
          method: editedExpense.method,
          tag: editedExpense.tag,
          exchangeRates: expenseList.exchangeRates,
        };
      }
      return expenseList;
    });

    editExpense(editedList);
    this.setState({
      value: 0,
      description: '',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, buttonEdit } = this.props;
    return (
      <div>
        <form>
          Valor
          <input
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />

          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((currencySelect, index) => (
                <option key={ index }>{currencySelect}</option>
              ))}
            </select>
          </label>

          <select
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

          Descrição
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />

          { buttonEdit ? (
            <button
              type="submit"
              data-testid="edit-btn"
              onClick={ this.onEdit }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="submit"
              onClick={ this.onSubmit }
            >
              Adicionar despesa
            </button>
          )}

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

  currencies: state.wallet.currencies,
  buttonEdit: state.wallet.buttonEdit,
  expenseId: state.wallet.editExpenseId,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({

  fetchCurrencies: () => dispatch(fetchAPI()),
  addExpenses: (expenses) => dispatch(fetchExpencies(expenses)),
  editExpense: (expense) => dispatch(editExpenciesForm(expense)),

});

Form.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  buttonEdit: PropTypes.bool,
  expenseId: PropTypes.number,
};

Form.defaultProps = {
  expenseId: 0,
  buttonEdit: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
