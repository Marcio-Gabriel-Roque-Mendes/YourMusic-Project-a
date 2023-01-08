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
      <div data-testid="page-favorites" className="bg-violet-100">
        <Header />
        <p
          data-testid="header-user-name"
          className="mb-4 text-fuchsia-800 font-bold
        bg-violet-100 text-xl"
        >
          {' '}
          {`Boas-vindas, ${user}`}
        </p>
        <p className="flex justify-center mb-12 text-purple-800 font-bold text-4xl">
          Suas musicas favoritas:
        </p>
        {!isLoading ? <LoadingOne /> : (
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
