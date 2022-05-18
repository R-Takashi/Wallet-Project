import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../../actions';

class Form extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     value: 0,
  //     descriacao: '',
  //   };
  // }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <input
            type="number"
            data-testid="value-input"
          />

          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
            >
              { currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{currency}</option>
              ))}
            </select>
          </label>

          <select
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <input
            type="text"
            data-testid="description-input"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({

  fetchCurrencies: () => dispatch(fetchAPI()),

});

Form.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
