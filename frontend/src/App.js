import React from 'react';
import BabylonVisualizer from './components/BabylonVisualizer';
import Planet from './components/Planet';
import Asteroid from './components/Asteroid';
import Sun from './components/Sun';
import MyScene from './components/Scene';
import Comet from './components/Comets';
import Filter from './components/Filter';


import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ width: '100vw', height: '100vh',  }}>
        <div>
          <Filter/>
        </div>
        {/* <Comet/> */}
        <BabylonVisualizer/>
        {/* <Planet/> */}

      </div>
    </div>
  );
}

export default App;
