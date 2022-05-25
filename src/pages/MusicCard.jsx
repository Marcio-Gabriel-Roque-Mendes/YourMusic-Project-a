import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Album from '../components/Header';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    favoritesSongs: [],
    carregando: false,
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    const favoritas = await getFavoriteSongs();
    this.setState({ carregando: false,
      favoritesSongs: favoritas,
    });
  }

  onListFavoriteChange = async ({ target }) => {
    this.setState({ loading: true });
    const { trackId } = this.props;
    const { checked } = target;
    const { favoritesSongs } = this.state;
    const pegaMusicaFavorita = await getMusics(trackId);

    // this.setState({ loading: true });
    // await addSong({ trackId });
    // this.setState({ loading: false });

    if (checked) {
      await addSong(pegaMusicaFavorita);
      this.setState({ favoritesSongs: [...favoritesSongs, pegaMusicaFavorita] });
      this.setState({ loading: false });
    }
    if (checked === false) {
      await removeSong(trackId);
      const CurrentFavorites = favoritesSongs
        .filter((musica) => musica.trackId !== trackId);
      this.setState({ favoritesSongs: CurrentFavorites });
      this.setState({ loading: false });
    }
  }

  render() {
    const { previewUrl, trackName, trackId, artworkUrl100 } = this.props;
    const { loading, favoritesSongs, carregando } = this.state;

    const condicionalLoading = loading && <div>Carregando...</div>;
    const condicioanlCarregando = carregando && <div>Carregando...</div>;
    return (
      <div>
        {condicionalLoading}
        {condicioanlCarregando}
        <div>
          <img src={ artworkUrl100 } alt="artwork da imagem" />
          <span>{ trackName }</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorita">
            Favorita
            <input
              type="checkbox"
              name="favorita"
              checked={ favoritesSongs.some((song) => song.trackId === trackId) }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.onListFavoriteChange }
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
  artworkUrl100: PropTypes.string.isRequired,
};

export default MusicCard;
