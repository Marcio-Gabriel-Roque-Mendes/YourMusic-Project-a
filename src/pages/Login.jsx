import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    isEnterButtonDisabled: true,
    name: '',
    loading: false,
    redirect: false,
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => { this.validacaoCaracts(); });
  }

  validacaoCaracts = () => {
    const { name } = this.state;
    const minLengthCaracts = 3;
    if (name.length >= minLengthCaracts) {
      return this.setState({ isEnterButtonDisabled: false });
    }
    return this.setState({ isEnterButtonDisabled: true });
  }

  onEnterButtonClick = (event) => {
    const { name } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    createUser({ name })
      .then(() => {
        this.setState({ loading: false, redirect: true });
      });
  }

  render() {
    const { isEnterButtonDisabled, name, loading, redirect } = this.state;

    if (loading) {
      return <div>Carregando...</div>;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              name="name"
              type="text"
              data-testid="login-name-input"
              maxLength={ 40 }
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <br />

          <button
            data-testid="login-submit-button"
            type="submit"
            onClick={ this.onEnterButtonClick }
            disabled={ isEnterButtonDisabled }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}
export default Login;
