import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormStyle from './styles';
import { fetchAPI, editExpenciesForm } from '../../../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.expenseToEdit.id,
      value: props.expenseToEdit.value,
      description: props.expenseToEdit.description,
      currency: props.expenseToEdit.currency,
      method: props.expenseToEdit.method,
      tag: props.expenseToEdit.tag,
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

  onEdit = (event) => {
    event.preventDefault();
    const { editExpense, expenses } = this.props;
    const { id } = this.state;

    const editedList = expenses.map((expenseList) => {
      if (expenseList.id === id) {
        return {
          ...this.state,
          exchangeRates: expenseList.exchangeRates,
        };
      }
      return expenseList;
    });
    editExpense(editedList);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (

      <FormStyle>
        <label htmlFor="valor">
          Valor:
          <input
            id="valor"
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
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
          />
        </label>

        <button
          id="edit"
          type="submit"
          data-testid="edit-btn"
          onClick={ this.onEdit }
        >
          Editar despesa
        </button>

      </FormStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseToEdit: state.wallet.editExpense,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchAPI()),
  editExpense: (expense) => dispatch(editExpenciesForm(expense)),
});

Form.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  expenseToEdit: PropTypes.objectOf(PropTypes.shape),
};

Form.defaultProps = {
  expenseToEdit: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
