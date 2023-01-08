/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoadingOne from '../components/LoadingOne';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    isEnterButtonDisabled: true,
    name: '',
    loading: false,
    redirect: false,
  }

  componentDidMount() {
    document.title = 'YourMusic';
  }

  onInputChange = ({ target }) => {
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
      return <LoadingOne />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <section className="flex flex-col items-center justify-center ">
          <header>
            <h1 className="text-6xl my-5 text-purple-800">
              YourMusic
            </h1>
            <hr />
          </header>

          <main>
            <div>
              <h1 className="mt-5 mb-5 text-center text-3xl text-purple-900">
                LOGIN
              </h1>

              <form>
                <label htmlFor="name" className="block text-center">
                  <p className="text-indigo-900">
                    Nome de usuário:
                  </p>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    data-testid="login-name-input"
                    maxLength={ 40 }
                    onChange={ this.onInputChange }
                    value={ name }
                    autoComplete="off"
                    placeholder="Nome"
                    className=" text-center block bg-gray-200 border-2 rounded border-violet-900"
                  />
                </label>
                <br />

                <button
                  data-testid="login-submit-button"
                  type="submit"
                  onClick={ this.onEnterButtonClick }
                  disabled={ isEnterButtonDisabled }
                  className="block bg-fuchsia-700 min-w-full rounded-xl text-white font-bold"
                >
                  Entrar
                </button>

              </form>
            </div>
          </main>
        </section>
      </div>
    );
  }
}
export default Login;
