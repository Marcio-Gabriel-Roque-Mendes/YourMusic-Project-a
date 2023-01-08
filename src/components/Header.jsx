/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    user: '',
    loading: false,
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    getUser().then((response) => this.setState(({
      user: response.name,
      loading: false,
    })));
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <div className="text-indigo-800">Carregando...</div>;
    }
    return (
      <header
        data-testid="header-component"
        className="flex flex-row justify-between items-center py-2.5 px-5 bg-gray-300
          mb-8"
      >
        <h1 className="text-6xl my-3 text-purple-800">
          YourMusic
        </h1>
        <nav className="text-indigo-900 ">
          <Link to="/" className="mx-2.5 hover:text-indigo-500 hover:font-bold">
            Home
          </Link>

          {' '}
          <Link
            to="/search"
            data-testid="link-to-search"
            className="mx-2.5 hover:text-indigo-500 hover:font-bold"
          >
            Pesquisar
          </Link>
          {' '}
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="mx-2.5 hover:text-indigo-500 hover:font-bold"
          >
            Musicas Favoritas
            {' '}

          </Link>
        </nav>

      </header>
    );
  }
}
export default Header;
