import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Album from '../components/Header';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
// import getMusics from '../services/musicsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    favoritesSongs: [],
    carregando: false,
    isFavorite: false,
    listOfSongs: [],
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    const favoritas = await getFavoriteSongs();
    this.setState({ carregando: false,
      favoritesSongs: favoritas,
    });
  }

  // onListFavoriteChange = async ({ target }) => {
  //   this.setState({ loading: true });
  //   const { trackId } = this.props;
  //   const { checked } = target;
  //   const { favoritesSongs } = this.state;
  //   const pegaMusicaFavorita = await getMusics(trackId);

  //   if (checked) {
  //     await addSong(pegaMusicaFavorita);
  //     this.setState({ favoritesSongs: [...favoritesSongs, pegaMusicaFavorita] });
  //     this.setState({ loading: false });
  //   }
  //   if (checked === false) {
  //     await removeSong(trackId);
  //     const CurrentFavorites = favoritesSongs
  //       .filter((musica) => musica.trackId !== trackId);
  //     this.setState({ favoritesSongs: CurrentFavorites });
  //     this.setState({ loading: false });
  //   }
  // }

  getFavoriteSongsList = async () => {
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({ favoritesSongs: favoriteSongsList });
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    const { trackId, getFavoriteSongsList, musica } = this.props;
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(musica);
      await this.getFavoriteSongsList();
    } else {
      await removeSong({ trackId });
      if (getFavoriteSongsList) {
        await getFavoriteSongsList();
      }
    }
    this.setState({ loading: false });
  }

  render() {
    const { previewUrl, trackName, trackId /* artworkUrl100 */ } = this.props;
    const { loading, favoritesSongs, carregando } = this.state;

    const condicionalLoading = loading && <div>Carregando...</div>;
    const condicioanlCarregando = carregando && <div>Carregando...</div>;
    return (
      <div>
        {condicionalLoading}
        {condicioanlCarregando}
        <div className="mb-16 flex flex-col">
          {/* <img src={ artworkUrl100 } alt="artwork da imagem" /> */}
          <span className="text-violet-700 font-bold mb-1 text-2xl">{ trackName }</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorita" className="flex flex-row text-violet-800">
            <p className="mr-1.5 mt-1.5">
              Favoritar
            </p>
            <input
              type="checkbox"
              name="favorita"
              checked={ favoritesSongs.some((song) => song.trackName === trackName) }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
            />
          </label>
        </div>
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  // artworkUrl100: PropTypes.string.isRequired,
  getFavoriteSongsList: PropTypes.func.isRequired,
  musica: PropTypes.objectOf.isRequired,
};

export default MusicCard;
