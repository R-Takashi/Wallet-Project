import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wallet from '../../../images/wallet.svg';
import HeaderStyle from './styles';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const currentCurrencie = Object.entries(expense.exchangeRates)
        .find((currency) => currency[0] === expense.currency);
      return acc + (expense.value * currentCurrencie[1].ask);
    }, 0);
    return (
      <HeaderStyle>
        <img
          src={ wallet }
          alt="Wallet"
        />
        <section>
          <p
            id="email"
            data-testid="email-field"
          >
            { email }
          </p>

          <div>
            <p
              className="mr-[10px]"
            >
              Despesa Total: R$

            </p>
            <p data-testid="total-field">{ total.toFixed(2) }</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </section>
      </HeaderStyle>
    );
  }
}

const mapStateToProps = (state) => ({

  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
