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
    const { /* user */ loading } = this.state;

    if (loading) {
      return <div className="text-indigo-800">Carregando...</div>;
    }
    return (
      <>
        <header
          data-testid="header-component"
          className="flex flex-row justify-between items-center py-2.5 px-5 bg-gray-300"
        >
          <h1 className="text-6xl my-3 text-purple-800">
            {/* <img src={imageMusica} alt="Logo de nota musical" />  */}
            YourMusic
          </h1>
          <nav className="text-indigo-900 ">
            {/* <Link to="/">Home </Link> */}
            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="mx-2.5 hover:text-indigo-500 hover:font-bold"
            >
              User
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
        <main className="bg-violet-100">
          {/* <p data-testid="header-user-name" className='my-2.5 text-indigo-800 bg-violet-100'>
       {' '}
       {`Boas-vindas, ${user}`}
     </p> */}
        </main>

      </>
    );
  }
}
export default Header;
