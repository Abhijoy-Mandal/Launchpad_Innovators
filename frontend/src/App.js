import React from 'react';
import BabylonVisualizer from './components/BabylonVisualizer';
import Planet from './components/Planet';
import Sun from './components/Sun';
import MyScene from './components/Scene';


import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Sun/>
        {/* <Planet/> */}
      </div>
    </div>
  );
}

export default App;
