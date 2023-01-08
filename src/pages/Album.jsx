import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    pegaListaMusicas: {},
    musicaPorId: [],
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
  }

  // async componentDidMount() {
  //   const { match } = this.props;
  //   const { params } = match;
  //   const { id } = params;
  //   const pegaMusicas = await getMusics(id);
  //   this.setState({
  //     pegaMusicas: pegaMusicas[0],
  //     musicaPorId: pegaMusicas.filter((songTrackId) => songTrackId.trackId),
  //   });
  // }

  componentDidMount() {
    this.getListOfSongs();
  }

  updateState = (musicasRequisitadas) => {
    this.setState({ artistName: musicasRequisitadas[0].artistName,
      collectionName: musicasRequisitadas[0].collectionName,
      artworkUrl100: musicasRequisitadas[1].artworkUrl100 });
  }

  getListOfSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const pegaMusicas = await getMusics(id);
    this.setState({
      pegaListaMusicas: pegaMusicas,
      musicaPorId: pegaMusicas.filter((songTrackId) => songTrackId.trackId) },
    () => this.updateState(pegaMusicas));
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
