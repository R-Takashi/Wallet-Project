import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, fetchExpencies, editExpenciesForm } from '../../actions';

const defaultTag = 'Alimentação';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: defaultTag,
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
    });
  }

  resetForm = () => {
    const { id } = this.state;
    this.setState({
      id: (id + 1),
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: defaultTag,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { addExpenses } = this.props;
    addExpenses(this.state);
    this.resetForm();
  }

  onEdit = (event) => {
    event.preventDefault();
    const { editExpense, expenseId, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const editedExpense = {
      id: expenseId,
      value,
      description,
      currency,
      method,
      tag,
    };

    const editedList = expenses.map((expenseList) => {
      if (expenseList.id === editedExpense.id) {
        return {
          ...editedExpense,
          exchangeRates: expenseList.exchangeRates,
        };
      }
      return expenseList;
    });
    editExpense(editedList);
    this.resetForm();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, buttonEdit } = this.props;
    return (

      <form
        className="flex self-center items-center justify-evenly
          bg-sky-700 h-[100px] text-white"
      >
        <label htmlFor="valor">
          Valor:
          <input
            id="valor"
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            className="ml-[10px] px-[12px] py-[10px]
             rounded shadow-lg shadow-gray-600
             outline-none w-[100px] text-black"
          />
        </label>

        <label htmlFor="moeda">
          Moeda :
          <select
            id="moeda"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
            className="ml-[10px] px-[12px] py-[10px] height-[20px]
             rounded shadow-lg shadow-gray-600
             outline-none w-[100px] text-black"
          >
            { currencies.map((currencySelect, index) => (
              <option key={ index }>{currencySelect}</option>
            ))}
          </select>
        </label>

        <label htmlFor="metodo">
          Método de pagamento:
          <select
            id="metodo"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
            className="ml-[10px] px-[12px] py-[10px] height-[20px]
              rounded shadow-lg shadow-gray-600
              outline-none w-[150px] text-black"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tagInput">
          Tag :
          <select
            id="tagInput"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            className="ml-[10px] px-[12px] py-[10px] height-[20px]
              rounded shadow-lg shadow-gray-600
              outline-none w-[135px] text-black"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="descriptionInput">
          Descrição:
          <input
            id="descriptionInput"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
            className="ml-[10px] px-[12px] py-[10px] height-[20px]
              rounded shadow-lg shadow-gray-600
              outline-none w-[100px] text-black
              focus:w-[300px]"
          />
        </label>

        { buttonEdit ? (
          <button
            type="submit"
            data-testid="edit-btn"
            onClick={ this.onEdit }
            className="px-[12px] py-[16] bg-white rounded
              w-[150px] h-[50px] shadow-lg shadow-gray-600
              disabled:opacity-75 disabled:text-slate-400 text-black
              hover:bg-amber-300 hover:text-black hover:shadow-white"
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="submit"
            onClick={ this.onSubmit }
            className="px-[12px] py-[16] bg-white rounded
              w-[150px] h-[50px] shadow-lg shadow-gray-600
              disabled:opacity-75 disabled:text-slate-400 text-black
              hover:bg-emerald-500 hover:text-white hover:shadow-white"
          >
            Adicionar despesa
          </button>
        )}

      </form>
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
