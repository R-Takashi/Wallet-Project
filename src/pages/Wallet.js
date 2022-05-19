import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './components/Form';
import Header from './components/Header';

class Wallet extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <Header />
        <Form />
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
          <tbody>
            {expenses.map((expense) => {
              const currentCurrency = Object.entries(expense.exchangeRates)
                .find((currency) => currency[0] === expense.currency);
              const nameCurrency = currentCurrency[1].name.split('/');
              const currencyValue = currentCurrency[1].ask;
              const total = expense.value * currencyValue;
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{nameCurrency[0]}</td>
                  <td>{Number(currencyValue).toFixed(2)}</td>
                  <td>{total.toFixed(2)}</td>
                  <td>Real</td>
                  <td>Editar/Excluir</td>
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
};

export default connect(mapStateToProps)(Wallet);
