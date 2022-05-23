import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Album from '../components/Header';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
  }

  onInputChange = async () => {
    const { trackId } = this.props;

    this.setState({ loading: true });
    await addSong({ trackId });
    this.setState({ loading: false });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading } = this.state;

    const condicionalLoading = loading && <div>Carregando...</div>;

    return (
      <div>
        {condicionalLoading}
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
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.onInputChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
