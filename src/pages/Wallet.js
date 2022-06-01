import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header/Header';
import FormEdit from './components/Forms/FormEdit';
import Form from './components/Forms/Form';
import Table from './components/Table/Table';

class Wallet extends React.Component {
  render() {
    const { buttonEdit } = this.props;
    return (
      <div className="bg-sky-900 h-screen">
        <Header />
        {buttonEdit
          ? <FormEdit />
          : <Form />}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  buttonEdit: state.wallet.buttonEdit,
});

Wallet.propTypes = {
  buttonEdit: PropTypes.bool,
};

Wallet.defaultProps = {
  buttonEdit: false,
};

export default connect(mapStateToProps)(Wallet);
