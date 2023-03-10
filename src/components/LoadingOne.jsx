import React from 'react';
import loadingOneGIF from '../assets/loading1.gif';

class LoadingOne extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loadingOneGIF } alt="carregando" className="w-80 py-64" />
      </div>
    );
  }
}

export default LoadingOne;
