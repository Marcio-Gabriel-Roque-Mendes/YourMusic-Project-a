import React from 'react';
import loadingTwoGIF from '../assets/loading2.gif';

class LoadingTwo extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loadingTwoGIF } alt="carregando" className='w-44'/>
      </div>
    );
  }
}

export default LoadingTwo;