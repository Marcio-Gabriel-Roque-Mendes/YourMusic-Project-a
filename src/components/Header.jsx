import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
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
    const { user, loading } = this.state;

    if (loading) {
      return <div>Carregando...</div>;
    }
    return (
      <BrowserRouter>
        <nav>
          {/* <Link to="/">Home </Link> */}
          <Link to="/profile" data-testid="link-to-profile">User </Link>
          {' '}
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          {' '}
          <Link to="/favorites" data-testid="link-to-favorites">Musicas Favoritas </Link>
        </nav>
        <br />
        <header data-testid="header-component">
          <p>
            User
            {' '}
            {user}
          </p>
        </header>
      </BrowserRouter>
    );
  }
}
export default Header;
