import React from 'react';
import loadingThreeGIF from '../assets/loading3.gif';

class LoadingThree extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loadingThreeGIF } alt="carregando" className="w-44" />
      </div>
    );
  }
}

export default LoadingThree;
