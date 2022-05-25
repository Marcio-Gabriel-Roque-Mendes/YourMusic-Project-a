import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    pegaMusicas: {},
    qualquer: [],
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const pegaMusicas = await getMusics(id);
    this.setState({
      pegaMusicas: pegaMusicas[0],
      qualquer: pegaMusicas.filter((songTrackId) => songTrackId.trackId),
    });
  }

  render() {
    const { pegaMusicas, qualquer } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          {' '}
          {pegaMusicas.artistName}
        </p>
        <p data-testid="album-name">
          {' '}
          {pegaMusicas.collectionName}
        </p>
        {qualquer.map((cadaMusica) => (
          <MusicCard
            key={ cadaMusica.trackName }
            previewUrl={ cadaMusica.previewUrl }
            trackName={ cadaMusica.trackName }
            trackId={ cadaMusica.trackId }
          />
        ))}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes
    .shape({ id: PropTypes.string }) }).isRequired,
};
export default Album;
