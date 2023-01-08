import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loadings';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favoriteSongsList: [],
  }

  componentDidMount() {
    this.getFavoriteSongsList();
  }

  getFavoriteSongsList = async () => {
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({
      isLoading: true,
      favoriteSongsList,
    });
  }

  render() {
    const { favoriteSongsList, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {!isLoading ? <Loading /> : (
          favoriteSongsList.map((cadaMusica) => (
            <MusicCard
              key={ cadaMusica.trackName }
              trackName={ cadaMusica.trackName }
              trackId={ cadaMusica.trackId }
              previewUrl={ cadaMusica.previewUrl }
              isFavorite
              getFavoriteSongsList={ this.getFavoriteSongsList }
            />
          ))
        )}
      </div>
    );
  }
}
export default Favorites;
