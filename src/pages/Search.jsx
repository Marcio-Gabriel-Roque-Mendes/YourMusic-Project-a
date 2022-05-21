import React, { Component } from 'react';
import { Link /* Route */ } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    nameArtist: '',
    loading: false,
    todasMusicas: [],
    nomeArtistaPosterior: '',
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

  onSearchButtonClick = async (event) => {
    const { nameArtist } = this.state;
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      const nomeDoArtista = nameArtist;
      const albumProcura = await searchAlbumsAPI(nomeDoArtista);
      this.setState({
        nameArtist: '',
        loading: false,
        todasMusicas: albumProcura,
        nomeArtistaPosterior: nomeDoArtista,
      });
    });
  }

  estruturarCadaAlbum = (albuns) => albuns.map((album) => (
    <div key={ album.collectionName }>
      <Link
        to={ `/album/${album.collectionId}` }
        data-testid={ `link-to-album-${album.collectionId}` }
      >
        <img src={ album.artworkUrl100 } alt={ album.artistName } />

        Prévia
        {' '}

      </Link>
      <h4 key={ album.artistId }>
        artistId:
        {' '}
        {album.artistId}
        ,
      </h4>
      <h2 key={ album.artistName }>
        artistName:
        {' '}
        {album.artistName}
        ,
      </h2>
      <h4 key={ album.collectionId }>
        collectionId:
        {' '}
        {album.collectionId}
        ,
      </h4>
      <h2 key={ album.collectionName }>
        collectionName:
        {' '}
        {album.collectionName}
        ,
      </h2>
      <h4 key={ album.collectionPrice }>
        collectionPrice:
        {' '}
        {album.collectionPrice}
        ,
      </h4>
      <h4 key={ album.artworkUrl100 }>
        artworkUrl100:
        {' '}
        {album.artworkUrl100}
        ,
      </h4>
      <h4 key={ album.releaseDate }>
        releaseDate:
        {' '}
        {album.releaseDate}
        ,
      </h4>
      <h4 key={ album.trackCount }>
        trackCount:
        {' '}
        {album.trackCount}
        ,
      </h4>
    </div>

  ));

  render() {
    const { isSearchButtonDisabled,
      nameArtist, loading, nomeArtistaPosterior, todasMusicas } = this.state;

    const condicicaoLoading = loading ? <div>Carregando...</div> : (
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
    );

    const condicaoResultAlbuns = nomeArtistaPosterior.length !== 0 && (
      <p>
        Resultado de álbuns de:
        {' '}
        {nomeArtistaPosterior}
      </p>
    );

    const condicaoSeRenderizaAlbum = todasMusicas.length === 0
      ? <p>Nenhum álbum foi encontrado</p> : this.estruturarCadaAlbum(todasMusicas);

    return (
      <div data-testid="page-search">
        <Header />
        { condicicaoLoading }
        {condicaoResultAlbuns}
        {/* { this.estruturarCadaAlbum(todasMusicas) } */}
        { condicaoSeRenderizaAlbum }

      </div>
    );
  }
}
export default Search;
