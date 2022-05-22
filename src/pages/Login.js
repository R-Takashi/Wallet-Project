import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';
import wallet from '../images/wallet.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleLogin = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const validatePassword = 6;

      this.setState({
        isDisabled: !(validateEmail.test(email) && password.length >= validatePassword),
      });
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { addEmail, history } = this.props;
    const { email } = this.state;
    addEmail(email);

    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div
        className="flex flex-col items-center
        justify-center h-screen w-screen bg-sky-100"
      >
        <form
          className="flex flex-col items-center bg-sky-600 h-[500px] w-[500px] rounded
        shadow-lg shadow-sky-600/50 "
        >
          <img
            src={ wallet }
            alt="Wallet"
            className="w-[300px] bg-sky-600"
          />
          <input
            name="email"
            data-testid="email-input"
            type="email"
            placeholder="EMAIL"
            value={ email }
            onChange={ this.handleLogin }
            className="mt-3 px-[12px] py-[20] height-[20px]
             rounded shadow-lg shadow-gray-600
             outline-none"
          />

          <input
            name="password"
            data-testid="password-input"
            type="password"
            placeholder="SENHA"
            value={ password }
            onChange={ this.handleLogin }
            className="mt-3 px-[12px] py-[20] height-[20px]
             rounded shadow-lg shadow-gray-600
             outline-none"
          />

          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.onSubmit }
            className="mt-10 px-[12px] py-[16] bg-white rounded
            w-[150px] h-[50px] shadow-lg shadow-gray-600
            disabled:opacity-75 disabled:text-slate-400"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({

  addEmail: (email) => dispatch(saveEmail(email)),

});

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
