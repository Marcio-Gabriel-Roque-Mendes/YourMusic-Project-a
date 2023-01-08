import React from 'react';
import loadingFourGIF from '../assets/loading4.gif';

class LoadingFour extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loadingFourGIF } alt="carregando" className="w-48" />
      </div>
    );
  }
}

export default LoadingFour;
