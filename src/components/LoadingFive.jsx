import React from 'react';
import loadingFiveGIF from '../assets/loading5.gif';

class LoadingFive extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loadingFiveGIF } alt="carregando" className="w-44" />
      </div>
    );
  }
}

export default LoadingFive;
