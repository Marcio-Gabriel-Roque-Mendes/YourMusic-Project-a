import React, { Component } from 'react';
import Header from '../components/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    nameArtist: '',
    // loading: false,
    // todasMusicas: [],
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => { this.validacaoCaracts(); });
  }

  validacaoCaracts = () => {
    const { nameArtist } = this.state;
    const minLengthCaracts = 2;
    if (nameArtist.length >= minLengthCaracts) {
      return this.setState({ isSearchButtonDisabled: false });
    }
    return this.setState({ isSearchButtonDisabled: true });
  }

  // onSearchButtonClick = async (event) => {
  //   const { nameArtist } = this.state;
  //   event.preventDefault();
  //   // this.setState({ loading: true });
  //   const nomeDoArtista = nameArtist;
  //   const albumProcura = await searchAlbumsAPI({ nomeDoArtista });
  //   this.setState({ todasMusicas: albumProcura });
  // }

  render() {
    const { isSearchButtonDisabled, nameArtist } = this.state;

    // if (loading) {
    //   return <div>Carregando...</div>;
    // }
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="nameArtist">
            Nome do Artista:
            <input
              id="nameArtist"
              name="nameArtist"
              type="text"
              data-testid="search-artist-input"
              maxLength={ 40 }
              onChange={ this.onInputChange }
              value={ nameArtist }
            />
          </label>
          { ' ' }
          <button
            data-testid="search-artist-button"
            type="submit"
            onClick={ this.onSearchButtonClick }
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
