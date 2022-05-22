import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Header.css';
import PropTypes from 'prop-types';
import wallet from '../../images/wallet.svg';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const currentCurrencie = Object.entries(expense.exchangeRates)
        .find((currency) => currency[0] === expense.currency);
      return acc + (expense.value * currentCurrencie[1].ask);
    }, 0);
    return (
      <div
        className="flex bg-sky-600 items-center
        justify-between "
      >
        <img
          src={ wallet }
          alt="Wallet"
          className="w-[100px] bg-sky-600 ml-[15px]"
        />
        <section
          className="flex items-center mr-[15px]
          h-[40px]"
        >
          <p
            data-testid="email-field"
            className="mr-[30px] bg-white rounded-xl p-[8px]"
          >
            { email }
          </p>

          <div
            className="flex bg-white rounded-xl p-[8px]"
          >
            <p
              className="mr-[10px]"
            >
              Despesa Total: R$

            </p>
            <p data-testid="total-field">{ total.toFixed(2) }</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </section>
      </div>
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
