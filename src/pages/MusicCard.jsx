/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingTwo from '../components/LoadingTwo';

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
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, favoritesSongs, carregando } = this.state;

    const condicionalLoading = loading && <LoadingTwo />;
    const condicioanlCarregando = carregando && <div>Carregando...</div>;
    return (

      <div className="flex justify-center content-center'">
        {condicionalLoading}
        {condicioanlCarregando}
        <div className="mb-12 flex flex-col border-solid border-4 border-black-600">
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
  getFavoriteSongsList: PropTypes.func.isRequired,
  musica: PropTypes.objectOf.isRequired,
};

export default MusicCard;
