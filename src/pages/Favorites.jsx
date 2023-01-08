import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loadings';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}
export default Favorites;
