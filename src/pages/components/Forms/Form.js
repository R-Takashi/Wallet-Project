import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormStyle from './styles';
import { fetchAPI, fetchExpencies } from '../../../actions';

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
          type="submit"
          onClick={ this.onSubmit }
        >
          Adicionar despesa
        </button>

      </FormStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchAPI()),
  addExpenses: (expenses) => dispatch(fetchExpencies(expenses)),
});

Form.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
