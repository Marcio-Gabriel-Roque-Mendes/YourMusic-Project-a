import React from 'react';
import Header from '../components/Header';
import LoadingOne from '../components/LoadingOne';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { getUser } from '../services/userAPI';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favoriteSongsList: [],
    user: '',
  }

  componentDidMount() {
    this.getFavoriteSongsList();
    getUser().then((response) => this.setState(({
      user: response.name,
    })));
  }

  getFavoriteSongsList = async () => {
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({
      isLoading: true,
      favoriteSongsList,
    });
  }

  render() {
    const { favoriteSongsList, isLoading, user } = this.state;
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
