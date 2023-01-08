import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    pegaListaMusicas: {},
    musicaPorId: [],
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    favoriteSongsList: [],
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
    const { pegaListaMusicas, musicaPorId, artistName,
      collectionName, artworkUrl100 } = this.state;
    return (
      <div className="bg-violet-100">
        <Header />
        <section className="flex justify-center flex-wrap mb-24 bg-violet-100 mt-10">
          <div className="mr-48 w-60">
            <img alt="album cover" src={ artworkUrl100 } className="w-52 rounded" />
            <h3 className="text-fuchsia-800 font-bold text-2xl">{`${collectionName}`}</h3>
            <p className="text-fuchsia-900">{`Por ${artistName}`}</p>
          </div>
          <div data-testid="page-album">
            <p data-testid="artist-name">
              {' '}
              {pegaListaMusicas.artistName}
            </p>
            <p data-testid="album-name">
              {' '}
              {pegaListaMusicas.collectionName}
            </p>
            {musicaPorId.map((cadaMusica) => (
              <MusicCard
                key={ cadaMusica.trackName }
                previewUrl={ cadaMusica.previewUrl }
                trackName={ cadaMusica.trackName }
                trackId={ cadaMusica.trackId }
              />
            ))}
          </div>
        </section>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes
    .shape({ id: PropTypes.string }) }).isRequired,
};
export default Album;
