import React from 'react';
import loadingGIF from '../assets/loading1.gif';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loadingGIF } alt="carregando" className="w-44" />
      </div>
    );
  }
}

export default Loading;
