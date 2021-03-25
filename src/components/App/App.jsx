import React from 'react';
import Canvas from '../Canvas/Canvas';

function App() {
  return (
    <Canvas
      currentResultNIT={234840}
      currentResultNITNeed={246051}
      currentResultPrediction={272289}
      currentResultPredictionNeed={283500}
      currentResultNITColor='orange'
      currentResultPredictionColor='grey'
    />
  )
}

export default App;
