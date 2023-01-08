import React from 'react';
import loadingSixGIF from '../assets/loading6.gif';

class LoadingSix extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loadingSixGIF } alt="carregando" className="w-44" />
      </div>
    );
  }
}

export default LoadingSix;
