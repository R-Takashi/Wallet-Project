import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../../actions';
import wallet from '../../images/wallet.svg';
import { LoginDiv, LoginForm } from './styles';

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
      <LoginDiv>
        <LoginForm>
          <img
            src={ wallet }
            alt="Wallet"
          />
          <input
            name="email"
            data-testid="email-input"
            type="email"
            placeholder="EMAIL"
            value={ email }
            onChange={ this.handleLogin }
          />

          <input
            name="password"
            data-testid="password-input"
            type="password"
            placeholder="SENHA"
            value={ password }
            onChange={ this.handleLogin }
          />

          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.onSubmit }
          >
            Entrar
          </button>
        </LoginForm>
      </LoginDiv>
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
