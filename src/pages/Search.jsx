import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    name: '',
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
    const minLengthCaracts = 2;
    if (name.length >= minLengthCaracts) {
      return this.setState({ isSearchButtonDisabled: false });
    }
    return this.setState({ isSearchButtonDisabled: true });
  }

  render() {
    const { isSearchButtonDisabled, name } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name-artist">
            Nome do Artista:
            <input
              id="name-artist"
              name="name-artist"
              type="text"
              data-testid="search-artist-input"
              maxLength={ 40 }
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          { ' ' }
          <button
            data-testid="search-artist-button"
            type="submit"
            // onClick={ this.onEnterButtonClick }
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
