import React, { Component } from 'react';
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
      <header data-testid="header-component">
        <p>
          User
          {' '}
          {user}
        </p>
      </header>
    );
  }
}
export default Header;
