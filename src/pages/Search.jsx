import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingFive from '../components/LoadingFive';

const moment = require('moment');

const numberAlbumsToAdd = 24;

class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    nameArtist: '',
    loading: false,
    allSongs: [],
    nameArtistInResults: '',
    quantityAlbuns: 24,
  }

  showMoreAlbums = async (event) => {
    const { nameArtistInResults, quantityAlbuns } = this.state;
    event.preventDefault();
    const sumQuantity = quantityAlbuns + numberAlbumsToAdd;
    const theNameOfTheArtist = nameArtistInResults;
    const requestGettingMoreAlbums = await searchAlbumsAPI(
      theNameOfTheArtist, sumQuantity,
    );
    this.setState({
      allSongs: requestGettingMoreAlbums,
      quantityAlbuns: sumQuantity,
    });
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
    const { nameArtist, quantityAlbuns } = this.state;
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      const theNameOfTheArtist = nameArtist;
      const albumProcura = await searchAlbumsAPI(theNameOfTheArtist, quantityAlbuns);
      this.setState({
        nameArtist: '',
        loading: false,
        allSongs: albumProcura,
        nameArtistInResults: theNameOfTheArtist,
        quantityAlbuns: numberAlbumsToAdd,
      });
    });
  }

  estruturarCadaAlbum = (albuns) => albuns.map((album) => (
    <div
      key={ album.collectionName }
      className="w-56 text-center content-center border-solid border-1 border-black-600
    mx-px my-3
   rounded text-fuchsia-900 "
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
          className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-1 px-1 my-3
          rounded-full"
        >
          Musicas
        </p>
        {' '}

      </Link>

      <h2 key={ album.artistName }>
        Artista:
        {' '}
        {album.artistName}
        ,
      </h2>

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

      <h4 key={ album.releaseDate }>
        Lançado em:
        {' '}
        {/* {new Date(album.releaseDate).getFullYear()} <- Apenas o ano de lançamento  */}
        {moment(album.releaseDate).format('DD/MM/YYYY')}
        ,
      </h4>

    </div>
  ));

  render() {
    const { isSearchButtonDisabled,
      nameArtist, loading, nameArtistInResults, allSongs } = this.state;

    const condicicaoLoading = loading ? <LoadingFive /> : (
      <form className="flex justify-center mb-2.5 mt-10 text-indigo-800">
        <label htmlFor="nameArtist" className="flex flex-row">
          <div className="text-xl font-bold">
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
            autoComplete="off"
            placeholder="Escreva aqui"
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

    const condicaoResultAlbuns = nameArtistInResults.length !== 0 && (
      <p className="flex justify-center mb-20 text-indigo-800">
        Resultado de álbuns de:
        {' '}
        {nameArtistInResults}
      </p>
    );

    const condicaoSeRenderizaAlbum = allSongs.length === 0
      ? <p className="flex content-center text-indigo-800">Nenhum álbum foi encontrado</p>
      : this.estruturarCadaAlbum(allSongs).sort((a, b) => new Date(b.props.children[5]
        .key).getFullYear() - new Date(a.props.children[5].key).getFullYear());

    // Referência: https://pt.stackoverflow.com/questions/100068/ordenando-um-array-de-objetos-por-data
    // Referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // Referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear

    const condicaoSeRenderizaAlbumEntaoMostraBotao = allSongs.length === 0
      ? (
        <p className="text-indigo-100">
          .
        </p>
      )
      : (
        <div className="flex justify-center text-xl mt-8 mb-10">
          <button
            data-testid="search-artist-button"
            type="submit"
            onClick={ this.showMoreAlbums }
            className="bg-indigo-700 hover:bg-indigo-500 text-white
      font-bold py-1 px-4 rounded-full ml-4"
          >
            Mostra mais albuns
          </button>
        </div>
      );

    return (
      <div data-testid="page-search" className="flex flex-col flex-wrap bg-violet-100">
        <Header />
        { condicicaoLoading }
        <div>
          {condicaoResultAlbuns}
        </div>
        <div className="flex flex-row flex-wrap justify-between pr-14 pl-14">
          { condicaoSeRenderizaAlbum }
        </div>
        <div>
          {condicaoSeRenderizaAlbumEntaoMostraBotao}
        </div>
      </div>
    );
  }
}
export default Search;
