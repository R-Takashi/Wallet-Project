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
          <select>
            <option value="">Selecione a Moeda</option>
            { currencies.map((currency, index) => (
              <option key={ index } value={ currency }>{currency}</option>
            ))}
          </select>
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
