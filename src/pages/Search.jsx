/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import { Link /* Route */ } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import '../albunsList.css'

const moment = require('moment'); // require moment().format();

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
    <div
      key={ album.collectionName }
      className="w-56 text-center content-center border-solid border-1 border-black-600
      mx-px my-3 rounded text-fuchsia-900 "
    >
      <img
        src={ album.artworkUrl100 }
        alt={ album.artistName }
        className="w-56 justify-center rounded "
      />

      <Link
        to={ `/album/${album.collectionId}` }
        data-testid={ `link-to-album-${album.collectionId}` }
      >
        <p
          className="bg-indigo-700 hover:bg-indigo-500 text-white
        font-bold py-1 px-1 my-3 rounded-full"
        >
          Musicas
        </p>
        {' '}

      </Link>
      {/* <h4 key={ album.artistId }>
        artistId:
        {' '}
        {album.artistId}
        ,
      </h4> */}
      <h2 key={ album.artistName }>
        Artista:
        {' '}
        {album.artistName}
        ,
      </h2>
      {/* <h4 key={ album.collectionId }>
        collectionId:
        {' '}
        {album.collectionId}
        ,
      </h4> */}
      <h2 key={ album.collectionName }>
        Álbum:
        {' '}
        {album.collectionName}
        ,
      </h2>
      <h4 key={ album.collectionPrice }>
        Preço do Álbum:
        {' '}
        {`$ ${album.collectionPrice}`}
        ,
      </h4>
      {/* <h4 key={ album.artworkUrl100 }>
        artworkUrl100:
        {' '}
        {album.artworkUrl100}
        ,
      </h4> */}
      <h4 key={ album.releaseDate }>
        Lançado em:
        {' '}
        {moment(album.releaseDate).format('DD/MM/YYYY')}
        {/* {moment(album.releaseDate).format('DD/MM/YYYY')} */}
        ,
      </h4>
      {/* <h4 key={ album.trackCount }>
        trackCount:
        {' '}
        {album.trackCount}
        ,
      </h4> */}
    </div>

  ));

  render() {
    const { isSearchButtonDisabled,
      nameArtist, loading, nomeArtistaPosterior, todasMusicas } = this.state;

    const condicicaoLoading = loading ? <div className="bg-violet-100 text-purple-700">
      Carregando...
    </div> : (
      <form className="flex justify-center mb-2.5 mt-20 text-indigo-800">
        <label htmlFor="nameArtist" className="flex flex-row">
          <div className="text-2xl xl font-bold">
            Nome do Artista:
          </div>
          <input
            id="nameArtist"
            name="nameArtist"
            type="text"
            data-testid="search-artist-input"
            maxLength={ 40 }
            onChange={ this.onInputChange }
            value={ nameArtist }
            className="text-center bg-gray-100 border-2 rounded border-violet-900 ml-2.5"
          />
        </label>
        { ' ' }
        <button
          data-testid="search-artist-button"
          type="submit"
          onClick={ this.onSearchButtonClick }
          disabled={ isSearchButtonDisabled }
          className="bg-indigo-700 hover:bg-indigo-500 text-white
          font-bold py-1 px-4 rounded-full ml-4"
        >
          Pesquisar
        </button>
      </form>
    );

    const condicaoResultAlbuns = nomeArtistaPosterior.length !== 0 && (
      <p className="flex justify-center mb-2.5 text-indigo-800">
        Resultado de álbuns de:
        {' '}
        {nomeArtistaPosterior}
      </p>
    );

    const condicaoSeRenderizaAlbum = todasMusicas.length === 0
      ? <p className="text-indigo-800">
        Nenhum álbum foi
        encontrado
      </p> : this.estruturarCadaAlbum(todasMusicas);

    return (
      <div
        data-testid="page-search"
        className="flex flex-col flex-wrap content-start bg-violet-100"
      >
        <Header />
        { condicicaoLoading }
        <div>
          {condicaoResultAlbuns}
        </div>
        {/* { this.estruturarCadaAlbum(todasMusicas) } */}
        <div className="flex flex-row flex-wrap justify-between ml-5 ">
          { condicaoSeRenderizaAlbum }
        </div>
      </div>
    );
  }
}
export default Search;
